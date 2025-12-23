import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { backgroundSupabase } from '@/utils/supabase/background';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(request: NextRequest) {
  // 1. Authenticate via Supabase session cookie
  const sb = backgroundSupabase;
  const {
    data: { user },
    error: sbError,
  } = await sb.auth.getUser(request.headers.get('cookie') || '');
  if (sbError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Look up the Stripe Customer ID
  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { stripe_customer_id: true },
  });
  if (!profile?.stripe_customer_id) {
    return NextResponse.json(
      { error: 'No Stripe customer on file' },
      { status: 400 }
    );
  }

  // 3. Create a billing portal session
  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL;
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${origin}/home`,
  });

  return NextResponse.json({ url: session.url });
}
