import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionTierType } from "@prisma/client";

export async function GET() {
  try {
    const allTracks = await prisma.bgTrack.findMany({
      select: {
        id: true,
        bgtrack_id: true,
        name: true,
        labels: true,
        tier: true,
        price_multiplier: true,
      },
    });

    const shaped = allTracks.map((v) => ({
      id: v.id,
      bgtrack_id: v.bgtrack_id,
      name: v.name,
      labels: v.labels,
      subscriptionTierType: v.tier
        .toUpperCase() as "FREE" | "STARTER" | "PRO",
      isPro: v.tier === SubscriptionTierType.pro,
      price_multiplier: v.price_multiplier,
    }));

    return NextResponse.json({ bgTracks: shaped }, { status: 200 });
  } catch (error) {
    console.error("Error fetching background tracks:", error);
    return NextResponse.json(
      { error: "Failed to fetch background tracks" },
      { status: 500 }
    );
  }
}
