"use client"

import { ScanEye } from "lucide-react"

interface DetailsButtonProps {
  onClick?: () => void
}

export function DetailsButton({ onClick }: DetailsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-6 py-4
                 bg-black rounded-lg border border-muted
                 hover:border-selection-text/40 hover:bg-card
                 transition-colors duration-300 ease-in-out group"
    >
      <span className="text-muted-foreground group-hover:text-foreground/80 text-sm transition-colors duration-300 ease-in-out">
        Details
      </span>
      <ScanEye className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-in-out" />
    </button>
  )
}
