"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerClose, DrawerTitle } from "@/components/ui/drawer" // [^1]
import { Separator } from "@/components/ui/separator" // [^2]
import { TooltipProvider } from "@/components/ui/tooltip" // [^3]
import { Button } from "@/components/ui/button"
import { Clock, Globe, GraduationCap, X } from "lucide-react"
import { InfoPill } from "./InfoPill"
import { DialogTitle } from "@/components/ui/dialog"

interface SessionCardModalProps {
    title: string
    description: string
    duration: string
    language: string
    level: string
    technique: string
    voice: string
    track: string
    generatedDate: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SessionCardModal({
    title = "Mind Clarity for Meetings",
    description = "Clear your mind and prepare yourself for a good meeting.",
    duration = "05:25m",
    language = "EN",
    level = "Beginner",
    technique = "Balance of Opposites",
    voice = "Charlotte",
    track = "Lo-Fi Atmospheric",
    generatedDate = "05/03/2025",
    open,
    onOpenChange,
}: SessionCardModalProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    // Content to be displayed in both Dialog and Drawer
    const content = (
        <div className="bg-zinc-950 text-foreground">
            {/* Title & description */}
            <div className="pb-2 px-6 pt-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-foreground">{title}</h3>
                    {isDesktop ? null : (
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <X className="h-4 w-4" />
                            </Button>
                        </DrawerClose>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <Separator className="bg-muted w-full" />

            {/* The top pills row */}
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

            <Separator className="bg-muted w-full" />

            {/* Footer */}
            <div className="text-xs font-medium text-muted-foreground text-center py-3">GENERATED {generatedDate}</div>
        </div>
    )

    // Render Dialog for desktop, Drawer for mobile
    return (
        <TooltipProvider delayDuration={100}>
            {isDesktop ? (
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent className="p-0 border-muted bg-transparent max-w-md">
                        <DialogTitle className="sr-only">{title}</DialogTitle> {/* Visually hidden for accessibility */}
                        {content}
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={onOpenChange}>
                    <DrawerContent className="p-0 max-h-[85vh]">
                        <DrawerTitle className="sr-only">{title}</DrawerTitle>
                        {content}
                    </DrawerContent>
                </Drawer>
            )}
        </TooltipProvider>
    )
}
