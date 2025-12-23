import React from "react";
import { SessionProvider } from "./session-context";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function NewSessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1) Auth (server side)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    // Redirect on server
    throw new Error("Not authenticated");
  }

  // 2) Fetch profile tier via Prisma
  const profile = await prisma.profile.findUniqueOrThrow({
    where: { id: user.id },
    select: { current_tier: true },
  });

  // 3) Wrap with provider, passing tier in props
  return (
    <SessionProvider initialTier={profile.current_tier}>
      {children}
    </SessionProvider>
  );
}
