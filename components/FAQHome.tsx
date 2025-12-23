"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FAQItem {
  question: string
  answer: React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    question: "What is ZenPersonal and how does it differ from traditional meditation?",
    answer:
      "ZenPersonal is a science-backed NSDR-style meditation generator. This type of meditation is non-spiritual and uses techniques proven by neuroscience to have benefits for your brain.",
  },
  {
    question: "Does ZenPersonal use AI?",
    answer:
      "We use AI but in a strictly conditioned form. That means that we make the system output a meditation script following a structure to mimic NSDR-style meditations. Every session is dynamically generated: based on your purpose a certain technique is chosen and the entire script is build to aid you in solving your specific problem.",
  },
  {
    question: "Is it free?",
    answer: (
      <span>
        Yes! You can generate 2 sessions for free, no credit card required. For additional sessions and premium voices and background tracks check{' '}
        <a
          href="https://zenpersonal.app/pricing"
          className="text-selection-text hover:underline"
        >
          pricing
        </a>.
      </span>
    ),
  },
  {
    question: "How should I use ZenPersonal?",
    answer:
      "It's completely up to you. These types of shorter sessions are usually done lying down, at any time of the day. Common moments are after lunch to reduce midday fatigue and before sleep.",
  },
  {
    question: "How is ZenPersonal different from Headspace or Calm?",
    answer:
      "Regular meditation apps like Headspace and Calm offer pre-recorded traditional meditation. The type of session created in ZenPersonal follows a different structure, different techniques and a different (non spiritual) tone of voice. Also, each session is uniquely generated for how you're feeling at that moment.",
  },
  {
    question: "Are my generated sessions private?",
    answer:
      "Every session you generate is private and accessible only to you.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "For now, you can generate sessions in English, Spanish, French, German, Chinese, Japanese, Korean, Portuguese and Hindi. We are constantly adding more languages.",
  },
  {
    question: "How can I contact ZenPersonal?",
    answer: (
      <span>
        You can contact us at{' '}
        <a
          href="mailto:hello@zenpersonal.app"
          className="text-selection-text hover:underline"
        >
          hello@zenpersonal.app
        </a>
      </span>
    ),
  },
]

export default function FAQHome() {
  const [openItem, setOpenItem] = React.useState<string | null>(null)

  return (
    <section className="w-full max-w-4xl mx-auto px-6 md:px-4 mt-64 my-24">
      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Left column: title (25% on md+) */}
        <div className="w-full md:w-1/4 max-w-xl mb-12 md:mb-0">
          <h2 className="text-3xl font-regular text-center md:text-left mb-0">
            FAQ
          </h2>
        </div>
  
        {/* Right column: accordion (75% on md+) */}
        <div className="w-full md:w-3/4 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(value) => setOpenItem(value)}
          >
            {faqItems.map((item, index) => {
              const itemValue = `item-${index}`
              const isOpen = openItem === itemValue
  
              return (
                <AccordionItem
                  key={index}
                  value={itemValue}
                  className="border-b border-gray-800 py-4"
                >
                  <AccordionTrigger className="flex justify-between text-md font-normal hover:no-underline">
                    <span className="flex-1 text-left">{item.question}</span>
                    <div className="flex-shrink-0 ml-4 w-4 h-4 flex items-center justify-center">
                      <Plus
                        size={24}
                        className={`transform transition-transform duration-500 ease-in-out ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
