"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

const voices = [
  "Whispery",
  "Middle-Aged",
  "Calming",
  "Deep",
  "Sensual",
  "ASMR",
  "Friendly",
  "Young",
  "Warm",
  "Rugged",
  "Soft",
  "Meditative",
  "Soothing",
]

interface PillItem {
  id: string
  text: string
}

// Helper to duplicate for seamless marquee
const createMarqueeRowPills = (items: string[], prefix: string): PillItem[] => {
  const single = items.map((text, i) => ({ id: `${prefix}-orig-${i}`, text }))
  const dup    = single.map(item => ({ ...item, id: item.id.replace("orig", "dup") }))
  return [...single, ...dup]
}

export default function CarouselVoices() {
  // pick even‑indexed voices
  const topRowVoices = voices.filter((_, idx) => idx % 2 === 0)
  const topRowPills  = createMarqueeRowPills(topRowVoices, "voice")

  // ref + state to measure width of original set
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    // measure only the originals
    const originals = Array.from(containerRef.current.children).slice(0, topRowVoices.length)
    const total = originals.reduce((sum, el) => {
      const w = (el as HTMLElement).offsetWidth
      return sum + w + 12  // mr-3 = 0.75rem = 12px
    }, 0)
    setWidth(total)
  }, [topRowVoices.length])

  // 50px/s → duration secs
  const duration = width / 50

  const pillClasses =
    "bg-violet-300/20 text-violet-300 px-3 py-2 rounded-full text-sm shadow-md w-fit whitespace-nowrap mr-3 flex-shrink-0"

  return (
    <section className="text-white overflow-x-hidden">
      <div className="container mx-auto px-0 md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] gap-12 md:gap-16 items-center">
        {/* Left column */}
        <div className="space-y-3 text-left">
          <h2 className="text-lg font-medium mb-2">Pick just the right voice</h2>
          <p className="text-muted-foreground text-base">
            Choose from a variety of high fidelity soothing voices.
          </p>
        </div>

        {/* Right column: Framer Motion marquee */}
        <div className="md:mt-0 mt-8">
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
              {topRowPills.map(pill => (
                <div key={pill.id} className={pillClasses}>
                  {pill.text}
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
