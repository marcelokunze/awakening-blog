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
    question: "What are minutes per month?",
    answer:
      "Minutes are the credits you use to generate meditation sessions. Each time you create a session (whether it's 5, 10, 15, or 20 minutes long) the session length is subtracted from your monthly minutes balance. At the start of each new billing cycle, your minutes fully reset. Some premium voices or background tracks may have a multiplier on the cost. When this happens, the minutes deducted will be adjusted accordingly.",
  },
  {
    question: "How do I get more minutes?",
    answer:
      "If you need more credits, you can upgrade your plan for a higher monthly limit or purchase credit packs to generate more media without changing your current subscription.",
  },
  {
    question: "Do unused minutes roll over to the next month?",
    answer:
      "Unused subscription minutes do not carry over to the next billing cycle. At the start of each new cycle, your minutes reset based on your subscription plan.",
  },
  {
    question: "Can I change my plan after purchasing one?",
    answer:
      "Yes, you can change your plan at any time. If you upgrade, the new plan takes effect immediately, and you'll be charged a prorated amount. If you downgrade, the change will apply at the start of your next billing cycle.",
  },
  {
    question: "How can I contact ZenPersonal?",
    answer: (
      <span>
        You can reach out via email at{' '}
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

export default function FAQPricing() {
  const [openItem, setOpenItem] = React.useState<string | null>(null)

  return (
    <section className="w-full max-w-4xl mx-auto px-6 md:px-4 mt-24 my-24">
      <div className="flex flex-col md:flex-row md:space-x-12">
        {/* Left column: title */}
        <div className="w-full md:w-1/4 max-w-xl mb-12 md:mb-0">
          <h2 className="text-3xl font-regular text-center md:text-left mb-0">
            FAQ
          </h2>
        </div>

        {/* Right column: accordion */}
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