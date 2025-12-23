// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import StartNowButton from "@/components/StartNowButton";

export function Footer() {
  return (
    <footer className="w-full">
      {/* Primary footer */}
      <div className="bg-shade-900 text-foreground px-4">
        <div
          className={
            `
            flex flex-col items-center gap-8 py-16 md:py-32
            md:flex-row md:justify-between md:items-center md:gap-0
          `
          }
        >
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/zenpersonal-logo-white-eclipse.svg"
                alt="Zen Personal Logo"
                width={320}
                height={60}
                priority
              />
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="w-full flex flex-col gap-4 md:hidden">
            {/* 1) Start full width */}
            <div className="w-full">
              {/* Override to accent blue */}
              <StartNowButton variant="accent" size="sm" className="w-full" />
            </div>
            {/* 2) Secondary buttons */}
            <div className="flex gap-4">
              <Button variant="secondary" size="sm" className="w-1/2" asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="secondary" size="sm" className="w-1/2" asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
              <Link href="/blog">Blog</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
              <Link href="/pricing">Pricing</Link>
            </Button>
            {/* Override to accent blue */}
            <StartNowButton variant="accent" size="sm" />
          </div>
        </div>
      </div>
      {/* Secondary footer */}
      <div className="bg-shade-920 text-gray-400 px-4">
        <div
          className="
          w-full
           flex flex-col justify-center items-start
          md:flex-row md:justify-between md:items-center
           py-4
             "
        >
          {/* two lines, always broken */}
          <p className="text-xs text-gray-400 text-left space-y-2">
            <span className="block">ZenPersonal ©2025</span>
            <span className="block">
              Built by {" "}
              <Link
                href="https://humanswithcomputers.com"
                className="hover:text-selection-text transition-colors"
              >
                Humans With Computers
              </Link>
            </span>
          </p>

          {/* on mobile this sits under and centered, on desktop it’s right-aligned */}
          <div className="flex gap-6 mt-4 md:mt-0 text-xs leading-wide">
            <Link
              href="/terms-and-conditions"
              className="hover:text-selection-text transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-selection-text transition-colors"
            >
              Privacy & GDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
