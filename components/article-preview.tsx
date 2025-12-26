"use client"

import { useState } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ArticlePreviewProps {
  slug: string
}

export function ArticlePreview({ slug }: ArticlePreviewProps) {
  const [isDesktop, setIsDesktop] = useState(true)

  // Iframe dimensions based on mode
  const iframeWidth = isDesktop ? 1400 : 390
  const iframeHeight = isDesktop ? 900 : 750
  
  // Target scale and dimensions
  const scale = isDesktop ? 0.4 : 0.46
  const containerWidth = iframeWidth * scale
  const contentHeight = iframeHeight * scale
  
  // Chrome bar height
  const chromeHeight = isDesktop ? 28 : 20

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-hidden">
      {/* Aspect Ratio Toggle */}
      <Tabs
        defaultValue="desktop"
        onValueChange={(value) => setIsDesktop(value === "desktop")}
      >
        <TabsList>
          <TabsTrigger value="desktop" className="gap-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Desktop</span>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Preview Container - uses CSS for responsive behavior */}
      <div
        className="relative rounded-md border border-border bg-background shadow-2xl overflow-hidden transition-all duration-500 ease-in-out w-full"
        style={{
          maxWidth: containerWidth,
          aspectRatio: `${containerWidth} / ${contentHeight + chromeHeight}`,
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
          <div className="flex justify-center items-center py-1 bg-muted/30">
            <div className="w-12 h-3 rounded-full bg-foreground/10" />
          </div>
        )}

        {/* Iframe Container - scales with container via CSS */}
        <div className="absolute inset-0 top-[28px] overflow-hidden">
          <iframe
            src={`/blog/${slug}`}
            className="absolute top-0 left-0 border-0 origin-top-left w-full h-full"
            style={{
              width: `${100 / scale}%`,
              height: `${100 / scale}%`,
              transform: `scale(${scale})`,
            }}
            title="Blog Preview"
          />
        </div>
      </div>
    </div>
  )
}
