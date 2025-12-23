"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
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

export interface VoiceData {
  id: string;
  voice_id: string;
  name: string;
  labels: string[];
  subscriptionTierType: "FREE" | "STARTER" | "PRO";
  price_multiplier: number;
  isPro: boolean;
  gender: string;
  accent?: string | null;
}

interface VoiceSelectionProps {
  language: string;
  onSelect?: (voice: VoiceData) => void;
  onPlayPreview?: (voiceId: string) => Promise<void>;
  onVoicesLoaded?: (voices: VoiceData[]) => void;
}

const noop = () => { };
const supabase = createClient();
const formatGender = (g: string) =>
  g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
interface PillRowProps {
  items: string[];
  isSelected: boolean;
}
const PillRow: React.FC<PillRowProps> = ({ items, isSelected }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const containerWidth = el.clientWidth;
    const gapPx = 8;
    let total = 0, count = 0;
    for (let i = 0; i < children.length; i++) {
      const w = children[i].getBoundingClientRect().width;
      if (i > 0) total += gapPx;
      total += w;
      if (total <= containerWidth) count++;
      else break;
    }
    setVisibleCount(count);
  }, [items]);

  return (
    <div ref={containerRef} className="flex gap-2 mt-2">
      {items.slice(0, visibleCount).map((text, i) => (
        <span
          key={i}
          className={`px-2 py-1 text-xs rounded-sm whitespace-nowrap ${isSelected
            ? "bg-selection-text/10 text-foreground"
            : "bg-muted text-foreground/80"
            }`}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

const tierOrder = ["FREE", "STARTER", "PRO"] as const;

export default function VoiceSelection({
  language,
  onSelect = noop,
  onVoicesLoaded = noop,
}: VoiceSelectionProps) {
  const { current_tier } = useSession();
  const userTier = current_tier.toUpperCase() as typeof tierOrder[number];

  const [voices, setVoices] = useState<VoiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { voice: sessionVoice } = useSession();
  const [selectedVoiceId, setSelectedVoiceId] = useState(
    () => sessionVoice?.id ?? ""
  );
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sessionVoice) {
      setSelectedVoiceId(sessionVoice.id);
    }
  }, [sessionVoice]);

  useEffect(() => {
    let cancelled = false;
    async function fetchVoices() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/voices?language=${language}`);
        if (!res.ok) throw new Error("Failed to fetch voices");
        const { voices } = await res.json();
        if (cancelled) return;
        setVoices(voices);
        onVoicesLoaded(voices);
        if (voices.length > 0) {
          if (!sessionVoice) {
            setSelectedVoiceId(voices[0].id);
            onSelect(voices[0]);
          }
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchVoices();
    return () => {
      cancelled = true;
    };
  }, [language, onSelect, onVoicesLoaded]);

  const handleSelect = (voice: VoiceData) => {
    setSelectedVoiceId(voice.id);
    onSelect(voice);
  };

  useEffect(() => {
    if (!api) return;
    const updateCurrentSlide = () => setCurrentSlide(api.selectedScrollSnap());
    updateCurrentSlide();
    api.on("select", updateCurrentSlide);
    return () => {
      api.off("select", updateCurrentSlide);
    };
  }, [api]);

  const scrollThreeAhead = () => api?.scrollTo(currentSlide + 3);
  const scrollThreeBack = () => api?.scrollTo(currentSlide - 3);

  const handlePlayPreview = async (voice: VoiceData) => {
    if (playingVoiceId === voice.id && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingVoiceId(null);
      audioRef.current = null;
      return;
    }


    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    try {
      setPlayingVoiceId(null);
      const filePath = `${language}/${voice.voice_id}.mp3`;
      const { data } = supabase.storage.from("voices").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      if (!publicUrl) {
        console.error("No public URL returned for", filePath);
        return;
      }
      audioRef.current = new Audio(publicUrl);
      audioRef.current.addEventListener("ended", () => {
        setPlayingVoiceId(null);
        audioRef.current = null;
      });
      await audioRef.current.play();
      setPlayingVoiceId(voice.id);
    } catch (err) {
      console.error("Failed to play voice preview:", err);
    }
  };

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
      <div className="p-6"><p className="text-red-500">Error: {error}</p></div>
    );
  }

  return (
    <div className="w-full p-0 md:p-6">
      <div className="relative mx-[-1.5rem] md:mx-0">
        <Carousel opts={{ align: "start", loop: false, dragFree: true }} className="w-full" setApi={setApi}>
          <CarouselContent className="ml-2 mt-2 md:mt-0 md:-ml-4 md:duration-200">
            {voices.map((voice) => {
              const userIndex = tierOrder.indexOf(userTier);
              const voiceIndex = tierOrder.indexOf(voice.subscriptionTierType);
              const isAllowed = userIndex >= voiceIndex;

              // Build badge using inline narrowing so TS knows tierType is STARTER|PRO
              let badge: React.ReactNode = null;

              // Locked tier → show lock pill
              if (!isAllowed && voice.subscriptionTierType !== "FREE") {
                badge = (
                  <TierInfoPill
                    icon={Lock}
                    tierType={voice.subscriptionTierType}
                    value={voice.subscriptionTierType}
                    label={`Requires a ${voice.subscriptionTierType} subscription to unlock`}
                  />
                );
              }
              // Unlocked PRO/STARTER with multiplier > 1 → show multiplier pill
              else if (
                isAllowed &&
                typeof voice.price_multiplier === "number" &&
                voice.price_multiplier > 1
              ) {
                badge = (
                  <TierInfoPill
                    icon={TrendingUp}
                    tierType="PRO"
                    value={`x${voice.price_multiplier}`}
                    label={`Multiplier: this voice costs ${voice.price_multiplier}× the usual minutes`}
                  />
                );
              }

              return (
                <CarouselItem
                  key={voice.id}
                  className="pl-4 basis-10/12 md:pl-4 md:basis-1/3 lg:basis-1/3"
                >
                  <div
                    onClick={() => isAllowed && handleSelect(voice)}
                    className={`
            relative rounded-lg p-4 text-white flex flex-col transition-colors
            ${isAllowed ? "cursor-pointer" : "cursor-not-allowed"}
            ${isAllowed && selectedVoiceId === voice.id
                        ? "bg-selection-text/10 border-selection-text border"
                        : isAllowed
                          ? "bg-black border border-muted hover:border-selection-text/40 hover:bg-card"
                          : "bg-zinc-900 border border-muted"
                      }
          `}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col space-y-1 min-h-[3rem]">
                        <h3 className="text-sm text-foreground">{voice.name}</h3>
                        {badge}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPreview(voice);
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded transition-all duration-200 active:scale-90 bg-accent text-foreground hover:bg-accent/90"
                        aria-label={
                          playingVoiceId === voice.id
                            ? "Pause voice preview"
                            : "Play voice preview"
                        }
                      >
                        {playingVoiceId === voice.id ? (
                          <Volume2 className="h-4 w-4" fill="foreground" />
                        ) : (
                          <Play className="h-4 w-4" fill="white" />
                        )}
                      </button>
                    </div>

                    <div className="border-t border-muted mt-2 mb-4" />
                    <PillRow
                      items={[
                        formatGender(voice.gender),
                        ...(language === "en" && voice.accent ? [voice.accent] : []),
                        ...voice.labels,
                      ]}
                      isSelected={selectedVoiceId === voice.id}
                    />
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
}
