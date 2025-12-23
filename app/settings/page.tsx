import { createClient as createSupabaseServer } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileSection from "@/components/ProfileSection";
import ProfileSubscription from "@/components/ProfileSubscription";

export default async function SettingsPage() {
  // ── 1) Auth check ───────────────────────────────────────
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // ── 2) Fetch profile & tier ──────────────────────────────
  const profile = await prisma.profile.findUniqueOrThrow({
    where: { id: user.id },
    select: {
      current_tier: true,
      meditation_credits_used: true,
      last_reset: true,
    },
  });
  const tier = await prisma.subscriptionTier.findUniqueOrThrow({
    where: { name: profile.current_tier },
  });

  // ── 3) Compute credits & reset ────────────────────────────
  const total = tier.monthly_credits;
  const used = profile.meditation_credits_used;
  const available = Math.max(0, total - used);

  // (resetPeriod is no longer a prop to ProfileSubscription, so we don't need it here)

  // ── 4) Render ─────────────────────────────────────────────
  return (
    <div className="flex flex-col bg-background text-white">
      <main className="p-6 flex flex-col items-center mt-16">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-12 md:space-y-16">
          {/* Profile */}
          <ProfileSection />

          {/* Subscription and Credits */}
          <ProfileSubscription
            available={available.toString()}
            total={total.toString()}
          />
        </div>
      </main>
    </div>
  );
}
