import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

type CheckoutBody = {
  tier: 'starter' | 'pro'
  interval: 'month' | 'year'
}

const PRICE_MAP: Record<CheckoutBody['tier'], Record<CheckoutBody['interval'], string>> = {
  starter: {
    month: 'price_1Rl9RjEXyCB9HFqh9qGbeAHL',
    year: 'price_1Rl9SgEXyCB9HFqhkiH7UpZ1',
  },
  pro: {
    month: 'price_1Rl9TfEXyCB9HFqhcFXtOOdF',
    year: 'price_1Rl9UPEXyCB9HFqhVUGyJ96N',
  },
}

export async function POST(request: Request) {
  const { tier, interval } = (await request.json()) as CheckoutBody

  // 1) Auth & load user
  const supabase = await createSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2) Load profile
  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
  })
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  // 3) Ensure Stripe Customer exists
  let customerId = profile.stripe_customer_id
  if (!customerId) {
    const customer = await stripe.customers.create({ email: profile.email })
    customerId = customer.id
    await prisma.profile.update({
      where: { id: user.id },
      data: { stripe_customer_id: customerId },
    })
  }

  // 4) Lookup Price ID
  const priceId = PRICE_MAP[tier]?.[interval]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid tier or interval' }, { status: 400 })
  }

  // 5) Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/home`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
