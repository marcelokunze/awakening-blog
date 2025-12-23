'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

// Pulse loader - a circle that pulses with foreground animation
function PulseLoader() {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <div
        className="absolute w-8 h-8 bg-foreground/60 rounded-full animate-ping"
        style={{ animationDuration: '4s' }}
      ></div>
      <div className="w-4 h-4 bg-foreground/70 rounded-full"></div>
    </div>
  );
}

export function SessionCardPending() {
  return (
    <Card className="w-full min-h-[200px] bg-zinc-900 rounded-2xl border border-muted">
      <CardContent className="h-full flex flex-col items-center justify-center px-6 py-10 space-y-6">
        {/* Pulse loader */}
        <PulseLoader />

        {/* Message */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Your session is being created
          </h3>
          <p className="text-sm text-muted-foreground">
            Please allow up to 5 minutes
          </p>
        </div>

        {/* Refresh button */}
        <Button
          variant="ghost"
          size="xs"
          className="text-gray-400 hover:text-white"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="mr-1 h-4 w-4" />
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
}
