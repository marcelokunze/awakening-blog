import React from "react";
import { Card } from "@/components/ui/card";
import { Microscope, TimerReset, Brain, Sofa } from "lucide-react";

export default function NSDRBenefits() {
  return (
    <section className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefit Card 1 */}
        <Card className="bg-sky-300/10 text-foreground border-0 rounded-md p-5">
          <div className="flex items-center space-x-4">
            <div className="bg-sky-300/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <TimerReset className="h-4 w-4 text-sky-300" />
            </div>
            <p className="text-base text-muted-foreground">
              <span className="text-foreground font-medium">Shorter</span> than traditional meditation (10-20 mins show results).
            </p>
          </div>
        </Card>

        {/* Benefit Card 2 */}
        <Card className="bg-sky-300/10 text-foreground border-0 rounded-md p-5">
          <div className="flex items-center space-x-4">
            <div className="bg-sky-300/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <Microscope className="h-4 w-4 text-sky-300" />
            </div>
            <p className="text-base text-muted-foreground">
              <span className="text-foreground font-medium">Non-spiritual</span> and non cryptic language.
            </p>
          </div>
        </Card>

        {/* Benefit Card 3 */}
        <Card className="bg-sky-300/10 text-foreground border-0 rounded-md p-5">
          <div className="flex items-center space-x-4">
            <div className="bg-sky-300/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <Brain className="h-4 w-4 text-sky-300" />
            </div>
            <p className="text-base text-muted-foreground">
              Techniques used are based in <span className="text-foreground font-medium">neuroscience</span>.
            </p>
          </div>
        </Card>

        {/* Benefit Card 4 */}
        <Card className="bg-sky-300/10 text-foreground border-0 rounded-md p-5">
          <div className="flex items-center space-x-4">
            <div className="bg-sky-300/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <Sofa className="h-4 w-4 text-sky-300" />
            </div>
            <p className="text-base text-muted-foreground">
              Usually done <span className="text-foreground font-medium">laying down</span> (not in lotus position).
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
