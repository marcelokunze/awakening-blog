"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/new/session-context";
import { SelectionPurpose } from "@/components/SelectionPurposes";
import { purposes } from "@/lib/purposes";
import { Button } from "@/components/ui/button";
import { AnimatedPlaceholderInput } from "@/components/AnimatedPlaceholderInput";

export default function Step1() {
  const router = useRouter();
  const { purpose, purposeId, setPurpose, setPurposeId } = useSession();

  // track if they've tried to continue without a purpose
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (purpose.trim().length === 0) {
      setShowError(true);
      return;
    }
    router.push("/new/2");
  };

  const handleCancel = () => {
    router.push("/home");
  };

  // reset error if they type or select something
  const onPurposeChange = (value: string) => {
    setPurpose(value);
    setPurposeId("");
    if (showError) setShowError(false);
  };

  const onPresetSelect = ({ id, name }: { id: string; name: string }) => {
    if (id) {
      setPurpose(name);
      setPurposeId(id);
    } else {
      setPurpose("");
      setPurposeId("");
    }
    if (showError) setShowError(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-foreground">
      <main className="flex-grow p-6 pb-24 sm:pb-0">
        <div className="max-w-4xl mx-auto mt-4 sm:mt-10">
          {/* Top Section */}
          <div className="flex items-center justify-between">
            <div className="max-w-md">
              <h1 className="text-xl font-medium mb-1">
                What is your main purpose for this session?
              </h1>
              <p className="text-muted-foreground text-sm">
                This will create the base for the script. You can customize the
                details in the next step.
              </p>
            </div>

            {/* Desktop: Continue + Cancel */}
            <div className="hidden sm:flex flex-col items-end space-y-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleContinue}
                className="min-w-[8rem]"
              >
                Continue
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCancel}
                className="min-w-[8rem]"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Input Section */}
          <div className="mt-12 sm:mt-24">
            <label
              htmlFor="purposeDesc"
              className="block text-sm font-medium mb-2"
            >
              Describe Purpose
            </label>
            <AnimatedPlaceholderInput
              id="purposeDesc"
              value={purpose}
              onChange={e => onPurposeChange(e.target.value)}
              className="w-full"
            />
            {showError && (
              <p className="mt-2 font-medium text-xs text-selection-text">
                Please enter or choose a purpose to continue.
              </p>
            )}
          </div>

          {/* Preset Purpose Selection */}
          <div className="mt-8 pt-4">
            <h2 className="text-sm font-medium">Or Choose</h2>
            <SelectionPurpose
              purposes={purposes}
              defaultSelected={purposeId}
              onSelect={onPresetSelect}
            />
          </div>
        </div>
      </main>

      {/* Mobile Footer: Cancel + Continue */}
      <footer className="sm:hidden fixed bottom-0 left-0 w-full bg-black p-4 border-t border-[#333333] z-50">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={handleCancel}
          >
            Cancel
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