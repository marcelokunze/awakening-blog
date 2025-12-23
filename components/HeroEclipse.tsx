"use client";

import StartNowButton from "./StartNowButton";
import { motion } from "motion/react";
import BreathingOrbInverted from "./BreathingOrbInverted";

export default function HeroEclipse() {
  const heading = "Personalized science-backed meditation to rest your mind.";
  const subheading = "ZenPersonal is a tool that generates unique science-backed meditations in real time.";

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative flex flex-col h-[80vh] md:h-screen overflow-hidden bg-background">
      {/* ——— Card background with outer margins ——— */}
      <div
        className="absolute inset-6 md:inset-12 bg-shade-920 shadow-lg overflow-hidden pointer-events-none z-10 flex items-center justify-center"
        style={{ transform: 'translateY(-32px)' }}
      >
        <BreathingOrbInverted
          size={
            `
              w-[35rem] h-[35rem]
              md:w-[75rem] md:h-[75rem]
              flex-shrink-0
            `
          }
        />
      </div>

      {/* ——— Content overlay inside card margins ——— */}
      <div className="absolute inset-6 md:inset-12 z-20" style={{ transform: 'translateY(-32px)' }}>
        {/* Centered main heading */}
        <div className="flex flex-1 items-center justify-center h-full">
          <motion.h1
            initial="initial"
            animate="animate"
            variants={childVariants}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-4xl font-host font-medium leading-tight text-white text-center max-w-[25ch]"
          >
            {heading}
          </motion.h1>
        </div>

        {/* Bottom-left subheading above button with extra gap */}
        <motion.p
          initial="initial"
          animate="animate"
          variants={childVariants}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute bottom-20 left-6 md:bottom-12 md:left-12 font-host text-sm md:text-lg text-white max-w-[35ch]"
        >
          {subheading}
        </motion.p>

        {/* Bottom-full-width button on mobile, corner on desktop */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-12"
        >
          <StartNowButton className="w-full md:w-auto md:min-w-[300px] md:py-6 md:text-md" />
        </motion.div>
      </div>
    </section>
  );
}
