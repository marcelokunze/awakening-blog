import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { meditationTask } from "../actions";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  // ─── Authenticate & get user ID ─────────────────────────────
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = user.id;

  // ─── Parse payload ───────────────────────────────────────────
  const { purpose, language, voiceId, bgTrack, duration, beginner } =
    await request.json();

  // ─── Prevent concurrent runs ─────────────────────────────────
  const inFlightCount = await prisma.meditation.count({
    where: {
      user_id: userId,
      status: { in: ["pending", "processing", "script_generated"] },
    },
  });
  if (inFlightCount > 0) {
    return NextResponse.json(
      { error: "A meditation is already generating. Please wait." },
      { status: 429 }
    );
  }

  // ─── Credit‐check (no deduction yet) ────────────────────────
  const profile = await prisma.profile.findUniqueOrThrow({ where: { id: userId } });
  const tier = await prisma.subscriptionTier.findUniqueOrThrow({
    where: { name: profile.current_tier },
  });
  const voice = await prisma.voice.findUniqueOrThrow({ where: { voice_id: voiceId } });
  const track = bgTrack
    ? await prisma.bgTrack.findUniqueOrThrow({ where: { bgtrack_id: bgTrack } })
    : null;

  const minutes = duration;
  const cost = Math.ceil(minutes * voice.price_multiplier * (track?.price_multiplier ?? 1));

  if (profile.meditation_credits_used + cost > tier.monthly_credits) {
    return NextResponse.json(
      { error: "Not enough minutes remaining this month." },
      { status: 400 }
    );
  }

  // ─── Enqueue the background job ────────────────────────────
  const result = await meditationTask({
    purpose,
    language,
    voiceId,
    bgTrack,
    duration,
    beginner,
  });

  return NextResponse.json(result);
}
