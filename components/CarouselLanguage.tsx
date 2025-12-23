"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

// List of "Hello" in different languages
const greetings = [
  "Hello",       // English
  "Hola",        // Spanish
  "Bonjour",     // French
  "Hallo",       // German
  "你好",          // Chinese
  "こんにちは",       // Japanese
  "안녕하세요",       // Korean
  "Olá",         // Portuguese
  "नमस्ते"        // Hindi
]

interface MarqueeItem {
  id: string
  text: string
}

// Duplicate the list for seamless marquee effect
const createMarqueeRowItems = (items: string[], prefix: string): MarqueeItem[] => {
  const original = items.map((text, idx) => ({ id: `${prefix}-orig-${idx}`, text }))
  const duplicate = original.map(item => ({
    id: item.id.replace("orig", "dup"),
    text: item.text,
  }))
  return [...original, ...duplicate]
}

export default function CarouselLanguage() {
  const rowItems = createMarqueeRowItems(greetings, "greeting")

  // ref & state for width of one set of items
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  // measure just the “original” set’s width (incl. mr-8 → 32px)
  useEffect(() => {
    if (!containerRef.current) return
    const originals = Array.from(containerRef.current.children).slice(0, greetings.length)
    const total = originals.reduce((sum, el) => {
      const elWidth = (el as HTMLElement).offsetWidth
      return sum + elWidth + 32 // mr-8 = 2rem = 32px
    }, 0)
    setWidth(total)
  }, [])

  // 50px/s → duration in seconds
  const duration = width / 50

  return (
    <section className="text-white overflow-x-hidden">
      <div className="container mx-auto px-0 md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] gap-12 md:gap-16 items-center">
        {/* Left column */}
        <div className="space-y-3 text-left">
          <h2 className="text-lg font-medium mb-2">Listen in your language</h2>
          <p className="text-muted-foreground text-base">
            Get into the zone naturally in your native tongue.
          </p>
        </div>

        {/* Right column: Framer‑Motion marquee */}
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
              {rowItems.map(item => (
                <div
                  key={item.id}
                  className="text-lg font-medium whitespace-nowrap mr-8 flex-shrink-0"
                >
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
