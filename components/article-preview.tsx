"use client"

import { useState } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ArticlePreviewProps {
  slug: string
}

export function ArticlePreview({ slug }: ArticlePreviewProps) {
  const [isDesktop, setIsDesktop] = useState(true)

  // Scale factor for the iframe content
  const scale = isDesktop ? 0.4 : 0.55

  // Actual dimensions of the iframe content (before scaling)
  const iframeWidth = isDesktop ? 1400 : 390
  const iframeHeight = isDesktop ? 900 : 750

  // Container dimensions (after scaling)
  const containerWidth = iframeWidth * scale
  const containerHeight = iframeHeight * scale

  // Max width for the container (larger for desktop, smaller for mobile screens)
  const maxWidth = isDesktop ? 560 : 340

  // Actual rendered width
  const renderedWidth = Math.min(containerWidth, maxWidth)
  const scaleFactor = renderedWidth / containerWidth
  const renderedHeight = containerHeight * scaleFactor

  // Chrome bar height
  const chromeHeight = isDesktop ? 24 : 20

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-full">
      {/* Aspect Ratio Toggle */}
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        <Button
          variant={isDesktop ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3 gap-2"
          onClick={() => setIsDesktop(true)}
        >
          <Monitor className="h-4 w-4" />
          <span className="hidden sm:inline">Desktop</span>
        </Button>
        <Button
          variant={!isDesktop ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-3 gap-2"
          onClick={() => setIsDesktop(false)}
        >
          <Smartphone className="h-4 w-4" />
          <span className="hidden sm:inline">Mobile</span>
        </Button>
      </div>

      {/* Preview Container */}
      <div
        className={cn(
          "relative rounded-xl border border-border bg-background shadow-2xl overflow-hidden transition-all duration-500 ease-in-out",
          "max-w-full"
        )}
        style={{
          width: renderedWidth,
          height: renderedHeight + chromeHeight,
        }}
      >
        {/* Browser Chrome (Desktop) / Notch (Mobile) */}
        {isDesktop ? (
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1 bg-muted/30">
            <div className="w-12 h-3 rounded-full bg-foreground/10" />
          </div>
        )}

        {/* Iframe Container */}
        <div
          className="relative overflow-hidden"
          style={{
            width: renderedWidth,
            height: renderedHeight,
          }}
        >
          <iframe
            src={`/blog/${slug}`}
            className="absolute top-0 left-0 border-0"
            style={{
              width: iframeWidth,
              height: iframeHeight,
              transform: `scale(${renderedWidth / iframeWidth})`,
              transformOrigin: "top left",
            }}
            title="Blog Preview"
          />
        </div>
      </div>
    </div>
  )
}
