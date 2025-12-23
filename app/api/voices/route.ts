import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionTierType } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");
  if (!language) {
    return NextResponse.json(
      { error: "Invalid language parameter" },
      { status: 400 }
    );
  }

  try {
    // 1) Fetch in seed order, including languages array
    const all = await prisma.voice.findMany({
      where: { languages: { has: language } },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        voice_id: true,
        name: true,
        labels: true,
        tier: true,
        gender: true,
        accent: true,
        languages: true,
        price_multiplier: true,
      },
    });

    // 2) Partition single-language voices
    const single = all.filter(
      (v) => v.languages.length === 1 && v.languages[0] === language
    );
    const rest = all.filter(
      (v) => !(v.languages.length === 1 && v.languages[0] === language)
    );

    // 3) Merge with single-language ones first
    const ordered = [...single, ...rest];

    // 4) Shape into the response format
    const voices = ordered.map((v) => ({
      id: v.id,
      voice_id: v.voice_id,
      name: v.name,
      labels: v.labels,
      subscriptionTierType: v.tier.toUpperCase() as "FREE" | "STARTER" | "PRO",
      isPro: v.tier === SubscriptionTierType.pro,
      gender: v.gender,
      accent: v.accent,
      price_multiplier: v.price_multiplier,
    }));

    return NextResponse.json({ voices }, { status: 200 });
  } catch (err) {
    console.error("Error fetching voices:", err);
    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 500 }
    );
  }
}
