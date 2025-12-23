"use client";

import React from "react";
import { Lock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "@/app/new/session-context";

export interface DurationOption {
  value: number;
  label: string;
  subscriptionTierType: "FREE" | "STARTER" | "PRO";
}

const options: DurationOption[] = [
  { value: 5, label: "5 Minutes", subscriptionTierType: "FREE" },
  { value: 10, label: "10 Minutes", subscriptionTierType: "STARTER" },
  { value: 15, label: "15 Minutes", subscriptionTierType: "PRO" },
  { value: 20, label: "20 Minutes", subscriptionTierType: "PRO" },
];

const tierOrder = ["FREE", "STARTER", "PRO"] as const;

interface DurationSelectionProps {
  value: number;
  onValueChange: (value: number) => void;
}

const DurationSelection: React.FC<DurationSelectionProps> = ({
  value,
  onValueChange,
}) => {
  const { current_tier } = useSession();
  const userTier = current_tier.toUpperCase() as typeof tierOrder[number];

  return (
    <RadioGroup
      value={value.toString()}
      onValueChange={(val) => onValueChange(parseInt(val, 10))}
      className="space-y-2"
    >
      {options.map((option) => {
        const optionTier = option.subscriptionTierType;
        const isAllowed =
          tierOrder.indexOf(optionTier) <= tierOrder.indexOf(userTier);
        const showBadge = optionTier !== "FREE" && !isAllowed;

        return (
          <div
            key={option.value}
            className={`flex items-center ${
              isAllowed ? "" : "cursor-not-allowed"
            }`}
          >
            {/* Wrap radio and label together for opacity and cursor */}
            <div className={`${isAllowed ? "" : "opacity-50"} flex items-center`}>
              <RadioGroupItem
                value={option.value.toString()}
                disabled={!isAllowed}
                className="h-4 w-4"
              />

              <label
                htmlFor={option.value.toString()}
                className={`ml-2 text-sm ${
                  isAllowed ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {option.label}
              </label>
            </div>

            {showBadge && (
              <div
                className={`flex items-center ml-2 text-xs font-medium ${
                  optionTier === "STARTER"
                    ? "text-blue-400"
                    : "text-purple-400"
                }`}
              >
                <Lock className="h-3 w-3 mr-1" />
                {optionTier}
              </div>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default DurationSelection;
