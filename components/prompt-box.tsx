"use client"

import { Copy, Check, MessageSquare } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const prompt = `I just installed an MDX blog using shadcn registry. Please help me complete the setup:

1. Add \`@plugin "@tailwindcss/typography";\` to your \`globals.css\` file (after the \`@import "tailwindcss";\` line)

2. Create a \`posts/\` folder in my project root

3. Create my first blog post at \`posts/hello-world.mdx\` with this frontmatter:
   - title: "Hello World"
   - date: today's date formatted like "January 1st, 2025"
   - category: "General"
   - description: "My first blog post"
   - author: "Your Name"
   - readingTime: "2 min read"
   Add some example content with a few h2 headings to demonstrate the table of contents.

4. Add a "Blog" link to my navbar that links to /blog`

export function PromptBox() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    toast.success("Prompt copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full">
      <div className="rounded-lg bg-muted/30 overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Prompt</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-foreground" />
            )}
          </Button>
        </div>
        <div className="p-4 font-mono text-sm font-light text-foreground whitespace-pre-wrap">
          {prompt}
        </div>
      </div>
    </div>
  )
}

