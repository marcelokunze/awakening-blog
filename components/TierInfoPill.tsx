import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";

export interface TierInfoPillProps {
  /** Icon to display (e.g., Lock) */
  icon?: LucideIcon;
  /** Tooltip label to explain the pill */
  label: string;
  /** Visible value inside the pill (e.g., "STARTER" or "×2.0") */
  value: string;
  /** Only STARTER or PRO tiers are supported */
  tierType: "FREE" | "STARTER" | "PRO";
}

export function TierInfoPill({
  icon: Icon,
  label,
  value,
  tierType,
}: TierInfoPillProps) {
  // determine colors based on tier
  const textColor = tierType === "STARTER" ? "text-blue-400" : "text-purple-400";
  const bgColor = tierType === "STARTER" ? "bg-blue-400/10" : "bg-purple-400/10";

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-sm transition-colors self-start",
              textColor,
              bgColor
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span className="text-xs font-medium">{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
