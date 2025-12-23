"use client"

import { useState, useEffect, useRef, type FC } from "react"
import { cn } from "@/lib/utils"
import { Moon, BatteryCharging, Zap, Heart, type LucideIcon } from "lucide-react"
import AudioPlayerMinimal from "@/components/AudioPlayerMinimal"

interface CaseStudy {
    id: string
    title: string
    description: string
    purpose: string
    technique: string
    voice: string
    backgroundTrack: string
    url: string
    icon: LucideIcon
}

const caseStudies: CaseStudy[] = [
    {
        id: "trendy-store",
        title: "Fall Asleep Faster",
        description:
            "Quiets the mental chatter and embrace naturally occurring sleep signals, which helps you transition to complete sleep.",
        purpose: "Prepare for deep sleep",
        technique: "Sequential Zone Mapping",
        voice: "Emily",
        backgroundTrack: "528hz + 14hz Binaural Beats",
        url: "https://aubzrptwuziupzmwchaz.supabase.co/storage/v1/object/public/homepreviews//meditation-1752774242811.m4a",
        icon: Moon,
    },
    {
        id: "abc-plumbing",
        title: "Recover from Sleep Debt",
        description:
            "Counteract a poor night’s sleep by mimicking deep-sleep restoration, instead of filling up your brain with caffeine.",
        purpose: "Calm my mind because I'm feeling super tired",
        technique: "Sensory Parameter Mapping",
        voice: "Michael",
        backgroundTrack: "Nature Sounds",
        url: "https://aubzrptwuziupzmwchaz.supabase.co/storage/v1/object/public/homepreviews//meditation-1752773605747.m4a",
        icon: BatteryCharging,
    },
    {
        id: "innovative-software",
        title: "Midday Energy Recharge",
        description:
            "10-20 minutes sessions will have a similar effect for your brain as taking a 1 hour nap.",
        purpose: "Brain reset before a presentation",
        technique: "Internal-External Alternation",
        voice: "Christina",
        backgroundTrack: "Gentle Flow",
        url: "https://aubzrptwuziupzmwchaz.supabase.co/storage/v1/object/public/homepreviews//meditation-1752774698914.m4a",
        icon: Zap,
    },
    {
        id: "city-health-clinics",
        title: "Reduce Anxiety and Stress",
        description:
            "Activate your parasympathetic nervous system to instantly reduce anxiety and stress.",
        purpose: "Feeling stressed because of my landlord",
        technique: "Orb Convergence Flow",
        voice: "Matteo",
        backgroundTrack: "Idyllic Shrine",
        url: "https://aubzrptwuziupzmwchaz.supabase.co/storage/v1/object/public/homepreviews//meditation-1752775409650.m4a",
        icon: Heart,
    },
]

const CaseStudiesSection: FC = () => {
    const [activeCase, setActiveCase] = useState<string>(caseStudies[0].id)
    const caseRefs = useRef<Record<string, HTMLDivElement | null>>({})

    const setCaseRef = (id: string) => (el: HTMLDivElement | null): void => {
        caseRefs.current[id] = el
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveCase(entry.target.id)
                        break
                    }
                }
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            },
        )

        const currentRefs = Object.values(caseRefs.current)
        for (const ref of currentRefs) {
            if (ref) observer.observe(ref)
        }

        return () => {
            for (const ref of currentRefs) {
                if (ref) observer.unobserve(ref)
            }
        }
    }, [])

    const handleMenuClick = (id: string) => {
        const ref = caseRefs.current[id]
        if (ref) {
            ref.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }

    return (
        <section className="text-gray-800 py-20 sm:py-32 px-0 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
                <div className="lg:sticky top-24 h-max">
                    <div className="text-left max-w-md mb-12 mt-6">
                        <div className="text-indigo-500 font-mono text-xs mb-3">USE CASES</div>
                        <h2 className="text-3xl font-host font-regular mb-2">
                            Real-Life scenarios proven by neuroscience
                        </h2>
                        <p className="text-black/50 font-host text-lg">
                            Tailored sessions for every moment you need deep rest and peak performance.
                        </p>
                    </div>
                    <ul className="space-y-6 mb-12">
                        {caseStudies.map((study) => (
                            <li key={study.id}>
                                <button
                                    onClick={() => handleMenuClick(study.id)}
                                    className={cn(
                                        "flex items-center text-lg font-medium transition-colors duration-300 ease-in-out",
                                        activeCase === study.id
                                            ? "text-indigo-500"
                                            : "text-gray-400 hover:text-gray-900",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "h-px mr-4 transition-all duration-300 ease-in-out",
                                            activeCase === study.id
                                                ? "bg-indigo-500 w-8"
                                                : "bg-gray-300 w-4 group-hover:w-8",
                                        )}
                                    />
                                    {study.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-16 space-y-8 lg:mt-0 lg:space-y-24">
                    {caseStudies.map((study) => {
                        const Icon = study.icon
                        return (
                            <div
                                key={study.id}
                                id={study.id}
                                ref={setCaseRef(study.id)}
                                className="lg=min-h-[80vh] flex items-center"
                            >
                                <div className="bg-neutral-900 text-white p-6 md:p-12 rounded-lg w-full">
                                    <div className="flex flex-col items-start mb-8">
                                        <div className="bg-emerald-500/20 p-2 rounded-sm w-10 h-10 flex items-center justify-center mb-12">
                                            <Icon className="h-5 w-5 text-emerald-300" />
                                        </div>
                                        <h3 className="text-xl md:text-4xl font-host font-base">{study.title}</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed mb-6">{study.description}</p>

                                    {/* Divider */}
                                    <hr className="border-gray-700 my-6" />

                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-selection-text font-mono text-xs">EXAMPLE</div>
                                        <div className="text-muted-foreground/70 font-mono text-xs">100% GENERATED BY OUR SYSTEM</div>
                                    </div>

                                    {/* Details */}
                                    <div className="py-3 px-0">
                                        {/** Purpose **/}
                                        <div className="grid grid-cols-[auto,1fr] items-start gap-4 py-2">
                                            <span className="text-sm text-muted-foreground">Purpose</span>
                                            <span className="min-w-0 text-right">
                                                <span
                                                    className="
        inline       /* stay inline so bg only covers text */
        whitespace-normal break-words  /* allow wrapping */
        px-1 py-0.5 rounded text-sm
        bg-yellow-600/20 text-yellow-400
      "
                                                    /* these two give you per‑line “clone” of the highlight */
                                                    style={{
                                                        WebkitBoxDecorationBreak: 'clone',
                                                        boxDecorationBreak: 'clone',
                                                    }}
                                                >
                                                    {study.purpose}
                                                </span>
                                            </span>
                                        </div>

                                        {/** Technique **/}
                                        <div className="flex items-start justify-between gap-4 py-2">
                                            <span className="text-sm text-muted-foreground">Technique</span>
                                            <span className="text-sm text-white text-right flex-1">{study.technique}</span>
                                        </div>

                                        {/** Voice **/}
                                        <div className="flex items-start justify-between gap-4 py-2">
                                            <span className="text-sm text-muted-foreground">Voice</span>
                                            <span className="text-sm text-white text-right flex-1">{study.voice}</span>
                                        </div>

                                        {/** Background Track **/}
                                        <div className="flex items-start justify-between gap-4 py-2">
                                            <span className="text-sm text-muted-foreground">Background Track</span>
                                            <span className="text-sm text-white text-right flex-1">{study.backgroundTrack}</span>
                                        </div>
                                    </div>

                                    {/* Audio Player */}
                                    <AudioPlayerMinimal audioUrl={study.url} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default CaseStudiesSection
