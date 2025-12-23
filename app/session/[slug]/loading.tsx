'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import FooterNavigation from '@/components/FooterNavigation';

export default function LoadingSession() {
  return (
    <>
      <div className="fixed inset-0 bg-black text-white flex justify-center items-center overflow-hidden">
        <div className="max-w-md w-full space-y-4 flex flex-col items-center px-4">
          
          {/* AudioPlayer skeleton */}
          <div className="max-w-md w-full bg-black rounded-lg p-4 text-white border border-muted">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-5 w-3/4 rounded-md" />    {/* title */}
              <Skeleton className="h-6 w-12 rounded-sm" />   {/* language pill */}
            </div>
            
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-md" />  {/* play/pause */}
              <div className="flex-1 flex items-center space-x-2">
                <Skeleton className="h-4 w-10 rounded-sm" />  {/* currentTime */}
                <Skeleton className="h-1 w-full rounded-md" /> {/* progress */}
                <Skeleton className="h-4 w-10 rounded-sm" />  {/* duration */}
              </div>
            </div>
          </div>

          {/* DetailsButton skeleton */}
          <div className="w-full flex items-center justify-between px-6 py-4
                          bg-black rounded-lg border border-muted">
            <Skeleton className="h-4 w-20 rounded-md" />  {/* “Details” text */}
            <Skeleton className="h-4 w-4 rounded-md" />   {/* icon */}
          </div>

        </div>
      </div>

      <FooterNavigation />
    </>
  );
}
