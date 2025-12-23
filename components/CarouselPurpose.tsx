"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

const meditationPurposes = [
  "I'm anxious because of a meeting",
  "I want to doze off into deep sleep",
  "Release tension in my neck",
  "After lunch brain reset",
  "I want to lucid dream",
  "Calm wake up",
  "WW3 apocalypse",
]

interface PillItem { id: string; text: string }

const createMarqueeRowPills = (items: string[], prefix: string): PillItem[] => {
  const single = items.map((t, i) => ({ id: `${prefix}-orig-${i}`, text: t }))
  const dup    = single.map(item => ({ ...item, id: item.id.replace("orig", "dup") }))
  return [...single, ...dup]
}

export default function CarouselPurpose() {
  const rowItems     = meditationPurposes.filter((_, i) => i % 2 === 0)
  const marqueeItems = createMarqueeRowPills(rowItems, "purpose")

  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  // measure just the “original” set’s width (incl. mr-3)
  useEffect(() => {
    if (!containerRef.current) return
    const originals = Array.from(containerRef.current.children).slice(0, rowItems.length)
    const total = originals.reduce((sum, el) => 
      sum + (el as HTMLElement).offsetWidth + 12, // 0.75rem = 12px
      0
    )
    setWidth(total)
  }, [rowItems.length])

  // 50px/s speed
  const duration = width / 50

  return (
    <section className="text-white overflow-x-hidden">
      <div
        className="container mx-auto px-0 md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] gap-12 md:gap-16 items-center"
      >
        {/* left column */}
        <div className="space-y-3 text-left">
          <h2 className="text-lg font-medium mb-2">Unique sessions every time</h2>
          <p className="text-muted-foreground text-base">
            Set your purpose and the entire session is crafted around it.
          </p>
        </div>

        {/* right column */}
        <div className="md:mt-0 mt-8 space-y-3">
          <div className="relative w-full overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex whitespace-nowrap will-change-transform"
              animate={{ x: [-0, -width] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  duration: duration || 0,
                },
              }}
            >
              {marqueeItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 text-sky-300 px-3 py-2 rounded-sm text-sm shadow-md w-fit whitespace-nowrap mr-3 flex-shrink-0"
                >
                  {item.text}
                </div>
              ))}
            </motion.div>
            {/* fades */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>

      {/* your language carousel goes here — wrap it in the exact same container/grid classes if you want perfect alignment */}
    </section>
  )
}
