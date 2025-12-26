"use client"

import Link from "next/link"
import { Github, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

const INSTALL_COMMAND = "npx shadcn@latest add https://awakening-blog.com/r/blog.json"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyCommand = () => {
    navigator.clipboard.writeText(INSTALL_COMMAND)
    toast.success("Install command copied to clipboard")
    setDrawerOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    setDrawerOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container-wrapper px-4 md:px-6">
        <div className="flex h-14 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Desktop - Full Logo */}
            <img
              src="/awaken-blog-light.svg"
              alt="Awakening Blog"
              className="hidden md:block dark:hidden h-9"
            />
            <img
              src="/awaken-blog-dark.svg"
              alt="Awakening Blog"
              className="hidden md:dark:block h-9"
            />
            {/* Mobile - Icon Only */}
            <img
              src="/awaken-blog-icon-light.svg"
              alt="Awakening Blog"
              className="block md:hidden dark:hidden h-6"
            />
            <img
              src="/awaken-blog-icon-dark.svg"
              alt="Awakening Blog"
              className="hidden dark:block md:dark:hidden h-6"
            />
          </Link>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-2">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-[31px] rounded-lg font-normal text-muted-foreground"
                asChild
              >
                <Link href="/blog">
                  Blog Home
                </Link>
              </Button>
              <div className="mx-2 h-4 w-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="h-[31px] rounded-lg font-normal text-muted-foreground"
                asChild
              >
                <Link href="/blog/what-is-yoga-nidra">
                  Article Page
                </Link>
              </Button>
            </nav>

            {/* Separator - Desktop */}
            <div className="mx-1 hidden md:block h-4 w-px bg-border" />

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

            {/* Separator - Desktop Only */}
            <div className="mx-1 hidden md:block h-4 w-px bg-border" />

            {/* Main CTA - Desktop Only */}
            <Button
              size="sm"
              className="hidden md:flex h-[31px] rounded-lg"
              onClick={copyCommand}
            >
              Install
            </Button>

            {/* Mobile Menu Button */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 md:hidden">
                  <Menu className="size-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-6 pb-8">
                  {/* Logo */}
                  <div className="mb-8">
                    <img
                      src="/awaken-blog-light.svg"
                      alt="Awakening Blog"
                      className="dark:hidden h-10"
                    />
                    <img
                      src="/awaken-blog-dark.svg"
                      alt="Awakening Blog"
                      className="hidden dark:block h-10"
                    />
                  </div>

                  {/* Menu Items */}
                  <nav className="flex flex-col gap-4">
                    <button
                      onClick={copyCommand}
                      className="text-left text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Install
                    </button>
                    <DrawerClose asChild>
                      <Link
                        href="/blog"
                        className="text-foreground hover:text-muted-foreground transition-colors"
                      >
                        Blog Home
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link
                        href="/blog/what-is-yoga-nidra"
                        className="text-foreground hover:text-muted-foreground transition-colors"
                      >
                        Article Page
                      </Link>
                    </DrawerClose>
                    <a
                      href="https://github.com/marcelokunze/awakening-blog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Github Repo
                    </a>
                    <button
                      onClick={toggleTheme}
                      className="text-left text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {mounted && (theme === "dark" ? "Light Mode" : "Dark Mode")}
                    </button>
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  )
}
