"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"

import { Clock, Globe, GraduationCap } from "lucide-react"
import { InfoPill } from "./InfoPill"

interface SessionCardProps {
  title: string
  description: string
  duration: string
  language: string
  level: string
  technique: string
  voice: string
  track: string
  generatedDate: string
  onClick?: () => void
}

export function SessionCard({
  title = "Mind Clarity for Meetings",
  description = "Clear your mind and prepare yourself for a good meeting.",
  duration = "05:25m",
  language = "EN",
  level = "Beginner",
  technique = "Balance of Opposites",
  voice = "Charlotte",
  track = "Lo-Fi Atmospheric",
  generatedDate = "05/03/2025",
  onClick,
}: SessionCardProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Card
        className="w-full bg-zinc-950 rounded-2xl border border-muted
                   hover:border-selection-text/40 hover:bg-card transition-colors
                   cursor-pointer group"
        onClick={onClick}
      >
        {/* Title & description */}
        <CardHeader className="pb-4">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground md:line-clamp-2">{description}</p>
        </CardHeader>

        <Separator className="bg-muted w-full" />

        <CardContent className="pb-0 px-0">
          <div className="flex items-center justify-between py-5 px-6">
            <span className="text-sm text-muted-foreground">General</span>
            <div className="flex flex-wrap gap-2 justify-end">
              <InfoPill icon={Clock} label="Duration" value={duration} />
              <InfoPill icon={Globe} label="Language" value={language} />
              <InfoPill icon={GraduationCap} label="Level" value={level} />
            </div>
          </div>

          <Separator className="bg-muted w-full" />

          {/* Technique/Voice/Track fields */}
          <div className="py-3 px-6">
            <div className="flex items-start justify-between gap-4 py-2">
              <span className="text-sm text-muted-foreground">Technique</span>
              <span className="text-sm text-white text-right max-w-[70%] md:max-w-[80%]">{technique}</span>
            </div>
            <div className="flex items-start justify-between gap-4 py-2">
              <span className="text-sm text-muted-foreground">Voice</span>
              <span className="text-sm text-white text-right max-w-[70%] md:max-w-[80%]">{voice}</span>
            </div>
            <div className="flex items-start justify-between gap-4 py-2">
              <span className="text-sm text-muted-foreground">Track</span>
              <span className="text-sm text-white text-right max-w-[70%] md:max-w-[80%]">{track}</span>
            </div>
          </div>

        </CardContent>

        <Separator className="bg-muted w-full" />

        <CardFooter className="text-xs font-medium text-muted-foreground justify-center tracking-wide py-4">
          GENERATED {generatedDate}
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}
