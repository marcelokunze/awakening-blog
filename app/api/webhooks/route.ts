import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

const PRICE_TO_TIER: Record<string, 'starter' | 'pro'> = {
  'price_1Rl9RjEXyCB9HFqh9qGbeAHL': 'starter',
  'price_1Rl9SgEXyCB9HFqhkiH7UpZ1': 'starter',
  'price_1Rl9TfEXyCB9HFqhcFXtOOdF': 'pro',
  'price_1Rl9UPEXyCB9HFqhVUGyJ96N': 'pro',
}

// Helper to determine tier from a price or subscription
function determineTierFromPrice(priceId: string): 'starter' | 'pro' | 'free' {
  return PRICE_TO_TIER[priceId] ?? 'free'
}

export async function POST(request: Request) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err: unknown) {
    console.error('Invalid webhook signature', (err as Error).message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    console.log(`Processing Stripe event: ${event.type}`)

    switch (event.type) {
      // 1) New subscription created (Checkout → Subscription transition)
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string'
          ? sub.customer
          : sub.customer?.id

        if (!customerId) {
          console.error('[webhook] customer.subscription.created → No customer ID found')
          break
        }

        // Grab the price on the first item
        const priceId = sub.items.data[0].price.id
        const tier = determineTierFromPrice(priceId)

        const { count } = await prisma.profile.updateMany({
          where: { stripe_customer_id: customerId },
          data: {
            current_tier: tier,
            last_reset: new Date(),
            meditation_credits_used: 0,
          },
        })
        console.log(`[webhook] customer.subscription.created → rowsUpdated=${count}, tier=${tier}`)
        break
      }

      // 2) Invoice created 
      case 'invoice.created': {
        break
      }

      // 3) Invoice payment succeeded — renew cycle & tier
      case 'invoice.paid':
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string'
          ? invoice.customer
          : invoice.customer?.id

        if (!customerId) {
          console.error('[webhook] invoice.payment_succeeded → No customer ID found')
          break
        }

        // For plan changes, we need to update the tier
        let tier: 'starter' | 'pro' | 'free' | null = null

        // If this is a subscription_update, try to determine the new tier
        if (invoice.billing_reason === 'subscription_update') {
          // In Basil API version, we need to use the raw event object
          // to get the subscription details or use the parent field
          const rawObject = event.data.object as Stripe.Invoice

          // Get subscription ID from either direct field or parent
          const subscriptionId = (rawObject.parent?.type === 'subscription_details' ?
            rawObject.parent.subscription_details?.subscription :
            undefined)


          if (subscriptionId) {
            try {
              // Fetch the subscription directly to get the latest price details
              const subscription = await stripe.subscriptions.retrieve(subscriptionId.toString());
              if (subscription && subscription.items.data.length > 0) {
                const priceId = subscription.items.data[0].price.id;
                tier = determineTierFromPrice(priceId);
              }
            } catch (err) {
              console.error(`Error fetching subscription details: ${err}`);
            }
          }
        }

        // Update profile data
        const { count } = await prisma.profile.updateMany({
          where: { stripe_customer_id: customerId },
          data: {
            ...(tier ? { current_tier: tier } : {}), // Only update tier if we found a new one
            last_reset: new Date(),
            meditation_credits_used: 0,
          },
        })

        console.log(`[webhook] invoice.payment_succeeded → rowsUpdated=${count}${tier ? `, new_tier=${tier}` : ''}`)
        break
      }

      // 4) Invoice payment failed — downgrade immediately
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string'
          ? invoice.customer
          : invoice.customer?.id

        if (!customerId) {
          console.error('[webhook] invoice.payment_failed → No customer ID found')
          break
        }

        const { count } = await prisma.profile.updateMany({
          where: { stripe_customer_id: customerId },
          data: { current_tier: 'free' },
        })
        console.log(`[webhook] invoice.payment_failed → rowsUpdated=${count}, downgraded to free`)
        break
      }

      // 5) Subscription canceled — downgrade
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string'
          ? sub.customer
          : sub.customer?.id

        if (!customerId) {
          console.error('[webhook] customer.subscription.deleted → No customer ID found')
          break
        }

        const { count } = await prisma.profile.updateMany({
          where: { stripe_customer_id: customerId },
          data: { current_tier: 'free' },
        })
        console.log(`[webhook] customer.subscription.deleted → rowsUpdated=${count}, downgraded to free`)
        break
      }

      // 6) Subscription updated - handle immediate plan changes
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string'
          ? sub.customer
          : sub.customer?.id

        if (!customerId) {
          console.error('[webhook] customer.subscription.updated → No customer ID found')
          break
        }

        // Check if the subscription status is active
        if (sub.status !== 'active') {
          console.log(`[webhook] customer.subscription.updated → Subscription not active (${sub.status})`)
          break
        }

        // Get the current price ID
        const priceId = sub.items.data[0].price.id
        const tier = determineTierFromPrice(priceId)

        // Update the profile with the new tier
        const { count } = await prisma.profile.updateMany({
          where: { stripe_customer_id: customerId },
          data: {
            current_tier: tier,
            // Reset credits on plan upgrade as a courtesy
            ...(tier !== 'free' ? {
              last_reset: new Date(),
              meditation_credits_used: 0,
            } : {})
          },
        })

        console.log(`[webhook] customer.subscription.updated → rowsUpdated=${count}, tier=${tier}`)
        break
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Error handling webhook:', err)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }
}
