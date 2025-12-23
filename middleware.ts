import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  console.log('middleware called');
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/protected/:path*',
    '/dashboard/:path*',
    '/test/:path*'
  ],
};
