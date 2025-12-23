// components/StartNowButton.tsx
'use client';

import { useUser } from '@/contexts/UserContext';
import { createClient } from '@/utils/supabase/client';
import { Button, type ButtonProps } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

interface StartNowButtonProps {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  children?: ReactNode;
}

export default function StartNowButton({
  variant = 'default',
  size = 'default',
  className,
  children,
}: StartNowButtonProps) {
  const supabase = createClient();
  const { user } = useUser();

  const handleSignIn = async () => {
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${origin}/auth/callback?next=/home` },
    });
  };

  // If user is logged in, always show "Open App"
  if (user) {
    return (
      <Link href="/home">
        <Button variant={variant} size={size} className={className}>
          Open App
        </Button>
      </Link>
    );
  }

  // If not logged in, show custom children or default "Start for Free"
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleSignIn}
    >
      {children ?? 'Start for Free'}
    </Button>
  );
}
