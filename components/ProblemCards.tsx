import Image from "next/image"
import { Battery, AlertTriangle, AlarmClock, EggFried } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ProblemCards() {
  return (
    <section className="w-full">
      {/* Stormy Clouds Banner */}
      <div className="flex justify-center">
        <Image
          src="/stormy-clouds.png"
          alt="Stormy Clouds"
          width={800}
          height={300}
          className="w-full max-w-[800px] h-auto object-cover rounded-md"
        />
      </div>

      {/* Cards overlapping the image: slight on mobile, deeper on tablets+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2 mt-[-100px] sm:mt-[-400px] relative z-10 px-4">

        {/* Cognitive Drain Card */}
        <Card className="bg-shade-920 text-foreground border-0 rounded-md p-5 md:p-8">
          <div className="mb-12">
            <div className="bg-red-500/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <Battery className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Notifications Everywhere</h3>
          <CardContent className="text-muted-foreground text-base p-0">
            Even relaxing we watch YouTube videos, instead of giving our brain actual rest.
          </CardContent>
        </Card>

        {/* Anxiety Overload Card */}
        <Card className="bg-shade-920 text-foreground border-0 rounded-md p-5 md:p-8">
          <div className="mb-12">
            <div className="bg-red-500/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Anxiety Overload</h3>
          <CardContent className="text-muted-foreground text-base p-0">
            Constant overstimulation keeps our brain in fight or flight mode.
          </CardContent>
        </Card>

        {/* Sleep Disruption Card */}
        <Card className="bg-shade-920 text-foreground border-0 rounded-md p-5 md:p-8">
          <div className="mb-12">
            <div className="bg-red-500/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <AlarmClock className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Sleep Disruption</h3>
          <CardContent className="text-muted-foreground text-base p-0">
            With constant sensorial input its not easy to fall asleep.
          </CardContent>
        </Card>

        {/* Decision Paralysis Card */}
        <Card className="bg-shade-920 text-foreground border-0 rounded-md p-5 md:p-8">
          <div className="mb-12">
            <div className="bg-red-500/20 p-2 rounded-sm w-8 h-8 flex items-center justify-center">
              <EggFried className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Decision Paralysis</h3>
          <CardContent className="text-muted-foreground text-base p-0">
            Information overload freezes decision-making, leaving you unable to act.
          </CardContent>
        </Card>

      </div>
    </section>
  )
}
