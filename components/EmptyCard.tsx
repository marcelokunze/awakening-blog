"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EmptyCard() {
  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full bg-card">
        <CardContent className="py-12 px-8 flex flex-col items-center space-y-4">
          <h2 className="text-xl font-medium text-foreground text-center">
            No sessions yet
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            This is very empty. Create your first session and get some piece of mind.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button asChild variant="secondary" size="sm" className="min-w-[140px]">
            <Link href="/new/1">Create Session</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
