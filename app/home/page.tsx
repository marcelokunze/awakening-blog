import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

import { SessionsPagination } from '@/components/SessionsPagination';
import { CreditsCard } from '@/components/CreditsCard';
import { SessionCard } from '@/components/SessionCard';
import { SessionCardPending } from '@/components/SessionCardPending';
import EmptyCard from '@/components/EmptyCard';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  // ─── Extract and normalize `page` from searchParams ─────────────────────
  const { page } = await searchParams;
  const rawPage = Array.isArray(page) ? page[0] : page;
  const currentPage = Math.max(1, parseInt(rawPage ?? '1', 10));
  const pageSize = 10;

  // ─── Auth ──────────────────────────────────────────────────────────────
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const fullName =
    typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : user.email ?? 'there';

  const displayName = fullName.split(' ')[0];


  // ─── Credits info ───────────────────────────────────────────────────────
  const profile = await prisma.profile.findUniqueOrThrow({ where: { id: user.id } });
  const tier = await prisma.subscriptionTier.findUniqueOrThrow({ where: { name: profile.current_tier } });
  const total = tier.monthly_credits;
  const used = profile.meditation_credits_used;
  const available = Math.max(0, total - used);

  const nextReset = new Date(profile.last_reset);
  nextReset.setMonth(nextReset.getMonth() + 1);
  const resetPeriod = nextReset.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // ─── Total count & fetch page ─────────────────────────────────────────
  const totalCount = await prisma.meditation.count({
    where: { user_id: user.id, status: { in: ['completed', 'pending', 'script_generated'] } },
  });
  const pageCount = Math.ceil(totalCount / pageSize);
  const meditations = await prisma.meditation.findMany({
    where: { user_id: user.id, status: { in: ['completed', 'pending', 'script_generated'] } },
    orderBy: { created_at: 'desc' },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  // ─── Fetch voices & bgtracks maps ──────────────────────────────────────
  const voices = await prisma.voice.findMany();
  const bgtracks = await prisma.bgTrack.findMany();
  const voiceMap = new Map(voices.map((v) => [v.voice_id, v.name]));
  const bgtrackMap = new Map(bgtracks.map((t) => [t.bgtrack_id, t.name]));

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-24">
          <div className="md:col-span-2">
            <h1 className="text-xl font-medium mb-2">Hi, {displayName}.</h1>
            <p className="text-muted-foreground text-md mb-8">
              Here you find your private guided deep rest sessions.
            </p>
          </div>
          <div className="md:col-span-1">
            <CreditsCard available={available.toString()} total={total.toString()} resetPeriod={resetPeriod} />
          </div>
        </div>

        {/* Sessions Library */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-medium">Sessions Library</h2>
            <span className="bg-zinc-800 text-xs px-2 py-0.5 rounded-md">{totalCount}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meditations.length > 0 ? (
              meditations.map((m) =>
                m.status === 'completed' ? (
                  <Link href={`/session/${m.id}`} key={m.id} className="block">
                    <SessionCard
                      title={m.title ?? 'Deep Rest Session'}
                      description={m.description ?? 'A guided session for deep rest.'}
                      duration={`${Math.ceil(m.duration_seconds / 60)}m`}
                      language={m.language_code.toUpperCase()}
                      level={m.is_beginner ? 'Beginner' : 'Regular'}
                      technique={m.technique ?? ''}
                      voice={voiceMap.get(m.voice_id ?? '') ?? ''}
                      track={bgtrackMap.get(m.background_track ?? '') ?? ''}
                      generatedDate={
                        m.created_at.toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric',
                        })
                      }
                    />
                  </Link>
                ) : (
                  <SessionCardPending key={m.id} />
                )
              )
            ) : (
              <div className="md:col-span-2">
                <EmptyCard />
              </div>
            )}
          </div>

          {/* Pagination */}
          {pageCount > 1 && <SessionsPagination currentPage={currentPage} pageCount={pageCount} />}
        </div>
      </div>
    </div>
  );
}
