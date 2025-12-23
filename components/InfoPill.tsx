import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { LucideIcon } from "lucide-react"

interface InfoPillProps {
  icon?: LucideIcon
  label: string
  value: string
  className?: string
}

export function InfoPill({
  icon: Icon,
  label,
  value,
  className,
}: InfoPillProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-md transition-colors",
              className
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
            <span className="text-xs text-foreground">{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
