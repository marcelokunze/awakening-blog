import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'

export async function GET() {
  // 1) Authenticate
  const supabase = await createSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2) Fetch profile
  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { current_tier: true },
  })
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  // 3) Return tier
  return NextResponse.json({ current_tier: profile.current_tier })
}