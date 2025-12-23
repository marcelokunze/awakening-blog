'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function LoadingHome() {
  return (
    <>

      <main className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Greeting & credits skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-24">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-6 w-1/3 rounded-md" />      {/* Greeting */}
              <Skeleton className="h-4 w-1/4 rounded-md" />      {/* Subtext */}
            </div>
            <div className="md:col-span-1">
              {/* CreditsCard skeleton matching actual structure */}
              <Card className="w-full max-w-sm bg-card">
                <CardHeader className="pb-2">
                  <Skeleton className="h-10 w-full rounded-md" /> {/* Create New Session button */}
                </CardHeader>

                <Separator className="my-4 bg-muted" />

                <CardContent className="pb-2">
                  <div className="flex justify-between items-center py-2">
                    <Skeleton className="h-4 w-1/3 rounded-md" /> {/* Minutes Available label */}
                    <Skeleton className="h-4 w-1/3 rounded-md" /> {/* Available / Total value */}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 flex flex-col">
                  <Skeleton className="h-8 w-full rounded-md" /> {/* Upgrade button */}
                  <Skeleton className="h-4 w-3/4 rounded-md mt-3 mx-auto" /> {/* Footer text */}
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Sessions Library title */}
          <div className="mb-8 flex items-center gap-2">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-5 w-8 rounded-md" />
          </div>

          {/* Session cards grid with skeleton matching SessionCard structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <TooltipProvider key={i} delayDuration={100}>
                <Card className="w-full bg-zinc-950 rounded-2xl border border-muted">
                  {/* Header skeleton */}
                  <CardHeader className="pb-4">
                    <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Title */}
                    {/* Two-line description skeleton */}
                    <Skeleton className="h-4 w-1/2 rounded-md mt-2" />
                    <Skeleton className="h-4 w-1/3 rounded-md mt-1" />
                  </CardHeader>

                  <Separator className="bg-muted w-full" />

                  {/* Content: general info pills */}
                  <CardContent className="pb-0 px-0">
                    <div className="flex items-center justify-between py-5 px-6">
                      <Skeleton className="h-4 w-1/6 rounded-md" />{/* General label */}
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                      </div>
                    </div>

                    <Separator className="bg-muted w-full" />

                    {/* Technique / Voice / Track skeleton rows with increased spacing */}
                    <div className="py-3 px-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-1/4 rounded-md" />
                        <Skeleton className="h-4 w-1/2 rounded-md" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-1/4 rounded-md" />
                        <Skeleton className="h-4 w-1/2 rounded-md" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-1/4 rounded-md" />
                        <Skeleton className="h-4 w-1/2 rounded-md" />
                      </div>
                    </div>
                  </CardContent>

                  <Separator className="bg-muted w-full" />

                  {/* Footer skeleton */}
                  <CardFooter className="py-4 flex justify-center">
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                  </CardFooter>
                </Card>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
