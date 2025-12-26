"use client"

import Link from "next/link"
import { Github, Moon, Sun, Copy, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const INSTALL_COMMAND = "npx shadcn@latest add https://awakening-blog.com/r/blog.json"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [hasCopied, setHasCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  const copyCommand = () => {
    navigator.clipboard.writeText(INSTALL_COMMAND)
    setHasCopied(true)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper px-4 md:px-6">
        <div className="flex h-14 items-center">
          {/* Logo */}
          <Button asChild variant="ghost" size="icon" className="size-8">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
              </svg>
              <span className="sr-only">Awakening Blog</span>
            </Link>
          </Button>

          {/* Nav Links */}
          <nav className="ml-4 flex items-center gap-4 text-sm">
            <Link
              href="/blog"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/blog/what-is-yoga-nidra"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Example
            </Link>
          </nav>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-2">
            {/* Separator */}
            <div className="mx-2 hidden h-4 w-px bg-border lg:block" />

            {/* GitHub */}
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <a
                href="https://github.com/marcelokunze/awakening-blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>

            {/* Separator */}
            <div className="mx-1 h-4 w-px bg-border" />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && (
                <>
                  <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Separator */}
            <div className="mx-1 mr-2 h-4 w-px bg-border" />

            {/* Main CTA */}
            <Button
              size="sm"
              className="hidden h-[31px] gap-2 rounded-lg sm:flex"
              onClick={copyCommand}
            >
              {hasCopied ? (
                <>
                  <Check className="size-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Copy Install
                </>
              )}
            </Button>
            <Button
              size="sm"
              className="h-[31px] rounded-lg sm:hidden"
              onClick={copyCommand}
            >
              {hasCopied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

