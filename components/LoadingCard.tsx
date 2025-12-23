"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoadingCard() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <Card className="w-full max-w-4xl mx-auto bg-card mx-4 sm:mx-auto">
        <CardContent className="pt-12 pb-8 px-8 flex flex-col items-center justify-center space-y-6">
          <PulseLoader />

          <div className="text-center max-w-sm space-y-4">
            <h2 className="text-xl font-medium text-foreground">
              Your meditation will appear on your homepage when ready.
            </h2>
            <p className="text-md text-muted-foreground">
              It&apos;s being created and may take up to 5 minutes.
              We are working to make this faster.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-12">
          <Button asChild variant="secondary" size="sm" className="min-w-[120px]">
            <Link href="/home">Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Pulse loader - a circle that pulses with blue animation
function PulseLoader() {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <div
        className="absolute w-8 h-8 bg-foreground/60 rounded-full animate-ping"
        style={{ animationDuration: "4s" }}
      ></div>
      <div className="w-4 h-4 bg-foreground/70 rounded-full"></div>
    </div>
  )
}
