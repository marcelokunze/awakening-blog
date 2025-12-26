"use client"

import { Copy, Check, Terminal } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const commands = {
  pnpm: "pnpm dlx shadcn@latest add https://awakening-blog.com/r/blog.json",
  npm: "npx shadcn@latest add https://awakening-blog.com/r/blog.json",
  yarn: "yarn dlx shadcn@latest add https://awakening-blog.com/r/blog.json",
  bun: "bunx --bun shadcn@latest add https://awakening-blog.com/r/blog.json",
}

type PackageManager = keyof typeof commands

export function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<PackageManager>("pnpm")

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(commands[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PackageManager)}>
        <div className="rounded-lg bg-muted/30 overflow-hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <TabsList>
                {(Object.keys(commands) as PackageManager[]).map((pm) => (
                  <TabsTrigger key={pm} value={pm}>
                    {pm}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-foreground" />
              )}
            </Button>
          </div>
          {(Object.keys(commands) as PackageManager[]).map((pm) => (
            <TabsContent key={pm} value={pm} className="m-0">
              <div className="p-4 font-mono text-sm font-light overflow-x-auto">
                <code className="text-foreground break-all">
                  {commands[pm]}
                </code>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

