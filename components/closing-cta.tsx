"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const installCommand = "npx shadcn@latest add https://awakening-blog.com/r/blog.json"

export function ClosingCTA() {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(installCommand)
    toast.success("Install command copied to clipboard")
  }

  return (
    <section className="container max-w-screen-xl mx-auto px-4 md:px-8 py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-medium mb-6">
          Install your blog structure and focus on the content.
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="min-w-[120px]" onClick={copyToClipboard}>
            Install
          </Button>
          <Button variant="outline" className="min-w-[120px]" asChild>
            <a
              href="https://github.com/marcelokunze/awakening-blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

