"use client";

import React, { useEffect, useState, useRef } from "react";
import { Play, Volume2, Lock, TrendingUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { createClient } from "@/utils/supabase/client";
import SelectionCardSkeleton from "./SelectionCardSkeleton";
import { useSession } from "@/app/new/session-context";
import { TierInfoPill } from "@/components/TierInfoPill";

export interface BgTrackData {
  id: string;
  bgtrack_id: string;
  name: string;
  labels: string[];
  subscriptionTierType: "FREE" | "STARTER" | "PRO";
  isPro: boolean;
  price_multiplier: number;
}

interface SelectionBgTrackProps {
  onSelect?: (track: BgTrackData) => void;
  onPlayPreview?: (bgtrackId: string) => Promise<void>;
  onTracksLoaded?: (tracks: BgTrackData[]) => void;
}

const noop = () => { };
const supabase = createClient();

const bgTrackOrder: string[] = [
  "gentle",
  "nature",
  "14beta",
  "rain",
  "6hztheta",
  "piano",
  "528hz14hz",
  "boundless",
  "deepthetawaves",
  "shrine",
] as const;
const tierOrder = ["FREE", "STARTER", "PRO"] as const;

const SelectionBgTrack: React.FC<SelectionBgTrackProps> = ({
  onSelect = noop,
  onTracksLoaded = noop,
}) => {
  const { current_tier } = useSession();
  const userTier = current_tier.toUpperCase() as typeof tierOrder[number];

  const [tracks, setTracks] = useState<BgTrackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;
    const updateCurrentSlide = () => setCurrentSlide(api.selectedScrollSnap());
    updateCurrentSlide();
    api.on("select", updateCurrentSlide);
    return () => {
      api.off("select", updateCurrentSlide);
    };
  }, [api]);

  useEffect(() => {
    let cancelled = false;
    async function fetchTracks() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/bg-tracks`);
        if (!res.ok) throw new Error("Failed to fetch tracks");
        const { bgTracks } = (await res.json()) as { bgTracks: BgTrackData[] };
        if (cancelled) return;

        const sorted = bgTracks
          .slice()
          .sort((a, b) =>
            bgTrackOrder.indexOf(a.bgtrack_id) - bgTrackOrder.indexOf(b.bgtrack_id)
          );
        setTracks(sorted);
        onTracksLoaded(sorted);

        if (sorted.length > 0) {
          setSelectedId(sorted[0].id);
          onSelect(sorted[0]);
        }        
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTracks();
    return () => {
      cancelled = true;
    };
  }, [onSelect, onTracksLoaded]);

  const handleSelect = (t: BgTrackData) => {
    setSelectedId(t.id);
    onSelect(t);
  };

  const handlePlay = async (t: BgTrackData) => {
    if (playingId === t.id && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingId(null);
      return;
    }


    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    try {
      setPlayingId(null);
      const filePath = `${t.bgtrack_id}.mp3`;
      const { data } = supabase.storage.from("bgtracks").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      if (!publicUrl) {
        console.error("No public URL returned for", filePath);
        return;
      }

      audioRef.current = new Audio(publicUrl);
      audioRef.current.addEventListener("ended", () => {
        setPlayingId(null);
        audioRef.current = null;
      });
      await audioRef.current.play();
      setPlayingId(t.id);
    } catch (err) {
      console.error("Failed to play track preview:", err);
    }
  };

  const scrollThreeAhead = () => api?.scrollTo(currentSlide + 3);
  const scrollThreeBack = () => api?.scrollTo(currentSlide - 3);

  if (loading) {
    return (
      <div className="w-full p-0 md:p-6">
        <div className="relative mx-[-1.5rem] md:mx-0">
          <Carousel opts={{ align: "start", loop: false, dragFree: true }} className="w-full">
            <CarouselContent className="ml-2 mt-2 md:mt-0 md:-ml-4 md:duration-200">
              {Array.from({ length: 5 }).map((_, i) => (
                <SelectionCardSkeleton key={i} />
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-0 md:p-6">
      <div className="relative mx-[-1.5rem] md:mx-0">
        <Carousel
          opts={{ align: "start", loop: false, dragFree: true }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="ml-2 mt-2 md:mt-0 md:-ml-4 md:duration-200">
            {tracks.map((t) => {
              const userIndex = tierOrder.indexOf(userTier);
              const trackIndex = tierOrder.indexOf(t.subscriptionTierType);
              const isAllowed = userIndex >= trackIndex;

              let badge: React.ReactNode = null;

              // 1) Locked STARTER/PRO
              if (!isAllowed && t.subscriptionTierType !== "FREE") {
                badge = (
                  <TierInfoPill
                    icon={Lock}
                    tierType={t.subscriptionTierType}
                    value={t.subscriptionTierType}
                    label={`Requires a ${t.subscriptionTierType} subscription to unlock`}
                  />
                );
              }
              // 2) Unlocked with multiplier > 1 → purple pill
              else if (isAllowed && t.price_multiplier > 1) {
                badge = (
                  <TierInfoPill
                    icon={TrendingUp}
                    tierType="PRO"
                    value={`x${t.price_multiplier}`}
                    label={`Multiplier: this track costs ${t.price_multiplier}× the usual minutes`}
                  />
                );
              }

              return (
                <CarouselItem
                  key={t.id}
                  className="pl-4 basis-10/12 md:pl-4 md:basis-1/3 lg:basis-1/3"
                >
                  <div
                    onClick={() => isAllowed && handleSelect(t)}
                    className={
                      `relative rounded-lg p-4 text-white flex flex-col transition-colors
                      ${isAllowed ? "cursor-pointer" : "cursor-not-allowed"}
                      ${isAllowed && selectedId === t.id
                        ? "bg-selection-text/10 border-selection-text border"
                        : isAllowed
                          ? "bg-black border border-muted hover:border-selection-text/40 hover:bg-card"
                          : "bg-zinc-900 border border-muted"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col space-y-1 min-h-[3rem]">
                        <h3 className="text-sm text-foreground">{t.name}</h3>
                        {badge}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(t);
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded transition-all duration-200 active:scale-90 bg-accent text-foreground hover:bg-accent/90"
                        aria-label={
                          playingId === t.id
                            ? "Pause track preview"
                            : "Play track preview"
                        }
                      >
                        {playingId === t.id ? (
                          <Volume2 className="h-4 w-4" fill="foreground" />
                        ) : (
                          <Play className="h-4 w-4" fill="white" />
                        )}
                      </button>
                    </div>

                    <div className="border-t border-muted mt-2 mb-4" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {t.labels.map((label, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded-sm ${selectedId === t.id
                            ? "bg-selection-text/10 text-foreground"
                            : "bg-muted text-foreground/80"
                            }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious onClick={scrollThreeBack} className="hidden md:flex md:items-center md:justify-center" />
          <CarouselNext onClick={scrollThreeAhead} className="hidden md:flex md:items-center md:justify-center" />
        </Carousel>
      </div>
    </div>
  );
};

export default SelectionBgTrack;