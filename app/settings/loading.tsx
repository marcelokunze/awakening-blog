'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function LoadingSettings() {
  return (
    <div className="flex flex-col bg-black text-white">
      <main className="p-6 flex flex-col items-center mt-16">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-12 md:space-y-16">
          
          {/* ProfileSection skeleton */}
          <div className="w-full max-w-xl flex items-center space-x-8 md:space-x-6">
            {/* Avatar placeholder */}
            <Skeleton className="h-[70px] w-[70px] rounded-md" />
            <div className="flex flex-col items-start gap-2 flex-1">
              {/* Email placeholder */}
              <Skeleton className="h-6 w-1/3 rounded-md" />
              {/* Logout button placeholder */}
              <Skeleton className="h-6 w-1/4 rounded-md" />
            </div>
          </div>

          {/* ProfileSubscription skeleton */}
          <div className="w-full max-w-xl space-y-6">
            <Card className="bg-zinc-900 rounded-lg">
              <CardHeader className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    {/* Plan name placeholder */}
                    <Skeleton className="h-5 w-1/4 rounded-md" />
                    {/* Description placeholder */}
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                  </div>
                  {/* Upgrade button placeholder */}
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>
              </CardHeader>

              <Separator className="bg-zinc-800" />

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      {/* Minutes Available label placeholder */}
                      <Skeleton className="h-4 w-1/3 rounded-md" />
                      {/* Credits description placeholder */}
                      <Skeleton className="h-3 w-1/2 rounded-md" />
                    </div>
                  </div>
                  {/* Progress bar background */}
                  <Skeleton className="h-2 w-full rounded-full" />
                  {/* Progress bar fill */}
                  <div className="relative">
                    <Skeleton
                      className="h-2 w-1/2 rounded-full absolute top-0 left-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
