import { NextResponse } from 'next/server';
import { createServerClient, CookieOptionsWithName } from '@supabase/ssr';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextPath = searchParams.get('next') ?? '/home';

  // Array to capture cookies set during the session exchange.
  const cookiesToSet: {
    name: string;
    value: string;
    options?: Partial<CookieOptionsWithName>;
  }[] = [];

  // Create the Supabase server client with custom cookie handling.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get('cookie') || '';
          return cookieHeader
            .split(';')
            .map((cookieStr) => cookieStr.trim())
            .filter(Boolean)
            .map((cookieStr) => {
              const [name, ...rest] = cookieStr.split('=');
              return { name, value: rest.join('=').trim() };
            });
        },
        setAll(newCookies) {
          newCookies.forEach((cookie) => cookiesToSet.push(cookie));
        },
      },
    }
  );

  // If the OAuth code exists, attempt to exchange it for a session.
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (!user.email) {
          throw new Error('Authenticated user has no email.');
        }
        // Upsert your user profile in your database.
        await prisma.profile.upsert({
          where: { id: user.id },
          update: { email: user.email },
          create: { id: user.id, email: user.email },
        });
      }

      // Create a NextResponse that redirects to the intended page.
      const response = NextResponse.redirect(`${origin}${nextPath}`);

      // Attach all cookies set by Supabase to the response.
      cookiesToSet.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, {
          path: '/',
          secure: true,
          sameSite: 'lax',
          // Uncomment and adjust the domain if needed:
          // domain: 'zenpersonal.app',
          ...options,
        });
      });
      return response;
    }
  }

  // If no code is provided or exchange failed, redirect to /login.
  return NextResponse.redirect(`${origin}/login`);
}