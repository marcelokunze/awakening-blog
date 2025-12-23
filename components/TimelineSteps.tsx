"use client"

import { ArrowRight } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import StartNowButton from "@/components/StartNowButton"

export default function TimelineSteps() {
  const { user } = useUser();
  const steps = [
    { number: "01", title: "Anytime of Day or Night", description: "Sit or lay down confortably" },
    { number: "02", title: "Create Session", description: "What do you want to achieve?" },
    { number: "03", title: "Play and Close your Eyes", description: "Simply follow the instructions from the audio" },
  ]

  return (
    <section className="w-full mt-48 py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Heading and CTA (desktop) */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="text-selection-text font-mono text-xs mb-3">THE PROCESS</div>
              <h2 className="text-3xl font-host font-regular tracking-tight leading-tight mb-6">
                Your path to a calm mind.
                <br />
                Personalized.
              </h2>
              <p className="text-gray-400 font-host max-w-md">
                Break the cycle of doom scrolling and reclaim your peace of mind.
              </p>
            </div>

            {/* CTA only visible on medium screens and up */}
            {!user && (
              <div className="hidden md:flex">
                <StartNowButton variant="secondary" className="flex items-center">
                  Start for Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </StartNowButton>
              </div>
            )}
          </div>

          {/* Right Column - Timeline Steps */}
          <div className="relative">
            {/* Continuous vertical line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-gray-700"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start group relative ${index !== steps.length - 1 ? "mb-12" : ""}`}
                >
                  <div className="text-sm w-12 mr-4 text-right">
                    <div className="text-gray-500 font-mono">{step.number}</div>
                  </div>
                  <div className="w-px mx-4 invisible"></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-regular mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA displayed after steps */}
        {!user && (
          <div className="mt-12  flex justify-center md:hidden">
            <StartNowButton variant="secondary" className="flex w-full items-center">
              Start for Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </StartNowButton>
          </div>
        )}
      </div>
    </section>
  )
}
