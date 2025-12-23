"use client";

import { useState } from "react";
import { StaticTVEffect } from "@/components/StaticTvEffect";
import { Switch } from "@/components/ui/switch";
import StartNowButton from "./StartNowButton";
import { motion } from "motion/react";

export default function Hero() {
  const [isStaticOn, setIsStaticOn] = useState(true);

  const mainHeading = isStaticOn
    ? "We are constantly bombarded with sensory information"
    : "Restore your mental and physical vigor";

  const rightSubheading =
    "Heal your brain in just 10–20 daily minutes of personalized guided deep rest.";

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative flex flex-col h-screen overflow-hidden bg-background">
      {/* ——— TV static mask: shorter on mobile, half-height on md+ ——— */}
      <div
        className="
          absolute
          inset-x-12
          top-12
          h-1/3 md:h-1/2
          overflow-hidden
          pointer-events-none
          z-10
        "
      >
        <StaticTVEffect
          className="absolute inset-0 w-screen h-screen"
          pixelSize={4}
          pixelSpacing={6}
          changeProbability={0.08}
          frameDelay={160}
          pixelDensity={0.6}
          pixelPersistence={0.21}
          showControls={false}
          isOn={isStaticOn}
        />
      </div>

      {/* ——— Content wrapper ——— */}
      <div className="relative z-20 flex flex-col md:flex-row flex-1 justify-end">
        {/* ——— LEFT ——— */}
        <div className="w-full md:w-2/3 flex flex-col justify-end px-6 pt-6 pb-6  md:px-12 md:pt-12 md:pb-24 text-white">
          <div>
            {/* Toggle */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-selection-text">Block Noise</span>
              <Switch
                checked={!isStaticOn}
                onCheckedChange={v => setIsStaticOn(!v)}
                className="data-[state=unchecked]:bg-selection-text"
              />
            </div>

            {/* Heading */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.15 } },
              }}
              className="max-w-[70ch]"
            >
              <motion.h1
                variants={childVariants}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-host font-normal leading-tight md:leading-[4rem]"
              >
                {mainHeading}
              </motion.h1>
            </motion.div>
          </div>
        </div>

        {/* ——— RIGHT ——— */}
        <div className="w-full md:w-1/3 flex flex-col justify-end items-start px-6 pt-2 pb-24 md:px-12 md:pt-12 md:pb-24">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
            }}
            className="w-full"
          >
            <motion.p
              variants={childVariants}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-base text-white/80 mb-4 md:mb-6"
            >
              {rightSubheading}
            </motion.p>
            <StartNowButton className="w-full h-12 md:h-12" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}