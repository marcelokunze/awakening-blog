"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { VoiceData } from "@/components/SelectionVoice";
import type { BgTrackData } from "@/components/SelectionBgTrack";
import type { SubscriptionTierType } from "@prisma/client";

interface SessionContextType {
  // … wizard state …
  purpose: string;
  setPurpose: (p: string) => void;
  purposeId: string;
  setPurposeId: (id: string) => void;

  language: string;
  setLanguage: (l: string) => void;

  voice: VoiceData | null;
  setVoice: (v: VoiceData) => void;

  bgTrack: BgTrackData | null;
  setBgTrack: (t: BgTrackData) => void;

  duration: number;
  setDuration: (d: number) => void;

  beginner: boolean;
  setBeginner: (b: boolean) => void;

  // ← now always loaded
  current_tier: SubscriptionTierType;
}

const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

interface Props {
  initialTier: SubscriptionTierType;
  children: ReactNode;
}

export function SessionProvider({ initialTier, children }: Props) {
  // Wizard
  const [purpose, setPurpose] = useState("");
  const [purposeId, setPurposeId] = useState("");
  const [language, setLanguage] = useState("en");
  const [voice, setVoice] = useState<VoiceData | null>(null);
  const [bgTrack, setBgTrack] = useState<BgTrackData | null>(null);
  const [duration, setDuration] = useState(5);
  const [beginner, setBeginner] = useState(false);

  // Profile (no client fetch, seeded from server)
  const [current_tier] = useState<SubscriptionTierType>(initialTier);

  return (
    <SessionContext.Provider
      value={{
        purpose,
        setPurpose,
        purposeId,
        setPurposeId,
        language,
        setLanguage,
        voice,
        setVoice,
        bgTrack,
        setBgTrack,
        duration,
        setDuration,
        beginner,
        setBeginner,
        current_tier,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
