"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/new/session-context";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import VoiceSelection, { VoiceData } from "@/components/SelectionVoice";
import SelectionBgTrack, { BgTrackData } from "@/components/SelectionBgTrack";

export default function Step2() {
  const router = useRouter();
  const { language, setLanguage, setVoice, setBgTrack } = useSession();

  const [voicesCount, setVoicesCount] = useState(0);
  const [bgTracksCount, setBgTracksCount] = useState(0);

  const handleContinue = useCallback(() => {
    router.push("/new/3");
  }, [router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleVoicesLoaded = useCallback((voices: VoiceData[]) => {
    setVoicesCount(voices.length);
  }, []);

  const handleBgTracksLoaded = useCallback((tracks: BgTrackData[]) => {
    setBgTracksCount(tracks.length);
  }, []);

  const handleVoiceSelect = useCallback(
    (voice: VoiceData) => {
      setVoice(voice);
    },
    [setVoice]
  );

  const handleBgSelect = useCallback(
    (track: BgTrackData) => {
      setBgTrack(track);
    },
    [setBgTrack]
  );

  return (
    <div className="flex flex-col h-screen bg-black text-foreground">
      {/* Main Content */}
      <main className="flex-grow p-6 pb-24 sm:pb-0">
        <div className="max-w-4xl mx-auto mt-4 sm:mt-10">
          {/* Top Section */}
          <div className="flex items-center justify-between">
            <div className="max-w-md">
              <h1 className="text-xl font-medium mb-1">
                How do you want this session to sound?
              </h1>
              <p className="text-muted-foreground text-sm">
                Suggested defaults work great. Feel free to update to fit your
                current mood.
              </p>
            </div>

            {/* Desktop buttons: Continue + Back */}
            <div className="hidden sm:flex flex-col items-end space-y-2">
              <Button variant="default" size="sm" onClick={handleContinue} className="min-w-[8rem]">
                Continue
              </Button>
              <Button variant="secondary" size="sm" onClick={handleBack} className="min-w-[8rem]">
                Back
              </Button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mt-12 sm:mt-24">
            <label
              htmlFor="language"
              className="block text-sm font-medium mb-2"
            >
              Language
            </label>
            <Select
              value={language}
              onValueChange={setLanguage}
            >
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>

          </div>

          {/* Voices */}
          <div className="mt-8 pt-4">
            <div className="flex items-center">
              <h2 className="text-sm font-medium">Voices</h2>
              <div className="ml-2 bg-muted text-white px-2 py-1 rounded-md text-xs">
                {voicesCount}
              </div>
            </div>
            <VoiceSelection
              language={language}
              onVoicesLoaded={handleVoicesLoaded}
              onSelect={handleVoiceSelect}
            />
          </div>

          {/* Background Tracks */}
          <div className="mt-8 pt-4">
            <div className="flex items-center">
              <h2 className="text-sm font-medium">Background Tracks</h2>
              <div className="ml-2 bg-muted text-white px-2 py-1 rounded-md text-xs">
                {bgTracksCount}
              </div>
            </div>
            <SelectionBgTrack
              onTracksLoaded={handleBgTracksLoaded}
              onSelect={handleBgSelect}
            />
          </div>
        </div>
      </main>

      {/* Mobile Footer: Back + Continue */}
      <footer className="sm:hidden fixed bottom-0 left-0 w-full bg-black p-4 border-t border-[#333333] z-50">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </footer>
    </div>
  );
}
