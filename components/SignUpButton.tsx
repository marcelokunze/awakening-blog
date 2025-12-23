"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface User {
  id: string;
  email?: string;
  user_metadata: Record<string, unknown>;
}

interface SignUpButtonProps {
  /** Tailwind-UI Button variant */
  variant?: React.ComponentProps<typeof Button>["variant"];
  /** Tailwind-UI Button size */
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}

export default function SignUpButton({
  variant = "default",
  size = "default",
  className,
}: SignUpButtonProps) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user as User);
      setLoading(false);
    });
  }, [supabase]);

  const handleSignUp = async () => {
    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}/auth/callback?next=/home` },
    });
    if (error) console.error("Sign up error:", error.message);
  };

  if (!loading && user) {
    return (
      <Link href="/home">
        <Button variant={variant} size={size} className={className}>
          Open App
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleSignUp}
    >
      Start For Free
    </Button>
  );
}
