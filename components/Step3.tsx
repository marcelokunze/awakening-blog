"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/new/session-context";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import DurationSelection from "@/components/DurationSelection";
import { InsufficientMinutesModal } from "@/components/AlertMinutes"; // ← NEW

export default function Step3() {
  const router = useRouter();
  const {
    purpose,
    language,
    voice,
    bgTrack,
    duration,
    setDuration,
    beginner,
    setBeginner,
  } = useSession();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose,
          language,
          voiceId: voice?.voice_id,
          bgTrack: bgTrack?.bgtrack_id,
          duration,
          beginner,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        if (json.error?.includes("Not enough minutes")) {
          setShowModal(true);
          return;
        } else {
          setErrorMessage(json.error || "Unknown error");
          return;
        }
      }

      router.push("/loading");
    } catch (err) {
      console.error(err);
      // TODO: show an error toast/snackbar (still here as your original TODO)
    } finally {
      setLoading(false);
    }
  }, [purpose, language, voice, bgTrack, duration, beginner, router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleUpgrade = useCallback(() => {
    setShowModal(false);
    router.push("/pricing");
  }, [router]);

  const handleHome = useCallback(() => {
    setShowModal(false);
    router.push("/home");
  }, [router]);

  return (
    <div className="flex flex-col h-screen bg-black text-foreground">
      <main className="flex-grow p-6 pb-24 sm:pb-0 flex justify-center">
        <div className="w-full max-w-4xl mt-4 sm:mt-10">
          <div className="flex items-center justify-between">
            <div className="max-w-md">
              <h1 className="text-xl font-medium mb-1">
                Final details and we&apos;re ready to go
              </h1>
              <p className="text-muted-foreground text-sm">
                Suggested defaults work great. Feel free to update to fit your
                current mood.
              </p>
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex flex-col items-end space-y-2">
              <Button
                variant="default"
                size="sm"
                className="min-w-[8rem]"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "Sending…" : "Generate"}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="min-w-[8rem]"
                onClick={handleBack}
                disabled={loading}
              >
                Back
              </Button>
            </div>
          </div>

          <div className="mt-12 sm:mt-24 flex flex-col items-center">
            <div className="w-full max-w-md">
              <h2 className="text-sm font-medium mb-4">Duration</h2>
              <DurationSelection
                value={duration}
                onValueChange={setDuration}
              />
            </div>

            <div className="w-full max-w-md mt-8">
              <h2 className="text-sm font-medium mb-2">Instructions</h2>
              <div className="flex items-center mb-2">
                <Switch
                  id="beginner-mode"
                  checked={beginner}
                  onCheckedChange={setBeginner}
                />
                <label
                  htmlFor="beginner-mode"
                  className="ml-2 text-sm font-medium cursor-pointer"
                >
                  Beginner Mode
                </label>
              </div>
              <p className="text-muted-foreground text-sm">
                Includes more context and instructions. Limits techniques to
                beginner ones.
              </p>
            </div>
          </div>

          {errorMessage && (
            <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
          )}
        </div>
      </main>

      {/* Mobile Footer */}
      <footer className="sm:hidden fixed bottom-0 left-0 w-full bg-black p-4 border-t border-[#333333] z-50">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={handleBack}
            disabled={loading}
          >
            Back
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Sending…" : "Generate"}
          </Button>
        </div>
      </footer>

      {/* ─── Insufficient Minutes Modal ──────────────────────────────────────────── */}
      <InsufficientMinutesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpgrade={handleUpgrade}
        onHome={handleHome}
      />
    </div>
  );
}
