'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const supabase = createClient();

  // Log the authenticated user data using getUser() instead of getSession()
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      console.log('Client user:', data.user);
    });
  }, [supabase]);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error('Sign in error:', error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
    </div>
  );
}
