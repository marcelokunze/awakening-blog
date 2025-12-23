"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/contexts/UserContext";

interface CreditsCardProps {
  available: string;     // number of minutes left
  total: string;         // total minutes per cycle
  resetPeriod: string;   // e.g. “May 10” or “30 days”
  onCreateSession?: () => void;
  onUpgrade?: () => void;
}

export function CreditsCard({
  available,
  total,
  onCreateSession,
  onUpgrade,
}: CreditsCardProps) {
  const router = useRouter();
  const { tier: currentTier, loading: userLoading } = useUser();

  const handleCreate = onCreateSession ?? (() => router.push("/new/1"));
  const handleUpgrade = onUpgrade ?? (() => router.push("/pricing"));

  return (
    <Card className="w-full max-w-sm bg-card">
      <CardHeader className="pb-2">
        <Button
          className="w-full flex items-center justify-center"
          onClick={handleCreate}
        >
          Create New Session
        </Button>
      </CardHeader>

      <Separator className="my-4 bg-muted" />

      <CardContent className="pb-2">
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-muted-foreground">Minutes Available</span>
          <span className="text-sm font-medium text-foreground">
            {available} <span className="text-muted-foreground"> / {total}</span>
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex flex-col">
        {/* Only show the Upgrade button if the user is not on the PRO tier */}
        {!userLoading && currentTier !== "pro" && (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={handleUpgrade}
            >
              Upgrade
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3 w-full">
              Get more minutes and unique voices.
            </p>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
