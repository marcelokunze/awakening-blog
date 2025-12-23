import 'server-only';
import { createServerClient, CookieOptionsWithName } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';

// Define types for clarity
type SupabaseCookie = { name: string; value: string };
type SupabaseCookieToSet = {
  name: string;
  value: string;
  options?: Partial<CookieOptionsWithName>;
};

export async function createClient() {
  // Depending on your Next.js version, nextCookies() may be async or sync.
  // If it’s synchronous, remove "await" below.
  const cookieStore = await nextCookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Use the anon key for session validation.
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll(): SupabaseCookie[] {
          return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(cookiesToSet: SupabaseCookieToSet[]) {
          // Note: On local dev, next/headers cookies might be read-only.
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // No-op if unable to set (this is fine in SSR; actual cookie writing is handled in middleware)
            }
          });
        },
      },
    }
  );
}
