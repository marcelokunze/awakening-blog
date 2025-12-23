"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

const bgTracks = [
  "Rainforest Ambience",
  "Ocean Waves",
  "Gentle Stream",
  "Mountain Breeze",
  "Whispering Pines",
  "Night Crickets",
  "Tibetan Singing Bowls",
  "Deep Space Drone",
  "Campfire Crackle",
  "Zen Garden",
  "Underwater Echoes",
  "Desert Winds",
  "Thunderstorm",
]

interface PillItem {
  id: string
  text: string
}

// Duplicate for seamless looping
const createMarqueeRowPills = (items: string[], prefix: string): PillItem[] => {
  const single = items.map((text, i) => ({ id: `${prefix}-orig-${i}`, text }))
  const dup    = single.map(item => ({ ...item, id: item.id.replace("orig", "dup") }))
  return [...single, ...dup]
}

export default function CarouselBGTracks() {
  // pick even‑indexed tracks
  const rowItems = bgTracks.filter((_, idx) => idx % 2 === 0)
  const marqueeItems = createMarqueeRowPills(rowItems, "bgtrack")

  // measure width of one full set (incl. mr-3 = 12px)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    const originals = Array.from(containerRef.current.children).slice(0, rowItems.length)
    const total = originals.reduce((sum, el) => {
      const w = (el as HTMLElement).offsetWidth
      return sum + w + 12
    }, 0)
    setWidth(total)
  }, [rowItems.length])

  // 50px/sec → seconds
  const duration = width / 50

  const pillClasses =
    "bg-emerald-300/20 text-emerald-300 px-3 py-2 rounded-full text-sm shadow-md w-fit whitespace-nowrap mr-3 flex-shrink-0"

  return (
    <section className="text-white overflow-x-hidden">
      <div className="container mx-auto px-0 md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] gap-12 md:gap-16 items-center">
        {/* Left column */}
        <div className="space-y-3 text-left">
          <h2 className="text-lg font-medium mb-2">Creative background tracks</h2>
          <p className="text-muted-foreground text-base">Why not meditate to Lo‑Fi?</p>
        </div>

        {/* Right column: Framer Motion marquee */}
        <div className="md:mt-0 mt-8 space-y-3">
          <div className="relative w-full overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex whitespace-nowrap will-change-transform"
              animate={{ x: [0, -width] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  duration: duration || 0,
                },
              }}
            >
              {marqueeItems.map(item => (
                <div key={item.id} className={pillClasses}>
                  {item.text}
                </div>
              ))}
            </motion.div>

            {/* Left fade */}
            <div
              className="absolute inset-y-0 left-0 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />
            {/* Right fade */}
            <div
              className="absolute inset-y-0 right-0 w-16 sm:w-20 md:w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
