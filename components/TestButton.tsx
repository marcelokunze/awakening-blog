// components/TestButton.tsx
"use client";

import { meditationTask } from "@/app/api/actions";

export default function TestButton() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button
        onClick={async () => {
          await meditationTask({
            purpose: "brain reset",
            duration: 10,
            beginner: true,
            language: "en",
            voiceId: "p43fx6U8afP2xoq1Ai9f",
            bgTrack: "gentle",
          });
          alert("Task triggered!");
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Trigger my task
      </button>
    </main>
  );
}
