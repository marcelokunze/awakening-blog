import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import BreathingOrbInverted from "./BreathingOrbInverted"
import AudioPlayer from "./AudioPlayer"

const SolutionCard: React.FC = () => {
  return (
    <Card className="mx-4 my-6 md:my-12 md:mx-auto md:max-w-6xl overflow-hidden border-white shadow-lg rounded-md bg-shade-920">
      <CardContent className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          {/* Orb cell */}
          <div className="flex items-center max-h-72 mb-24 md:mb-0" style={{ aspectRatio: "4/3" }}>
            <div className="w-full flex justify-center md:justify-start md:-ml-20">
              <BreathingOrbInverted />
            </div>
          </div>

          {/* Content cell */}
          <div className="flex flex-col justify-between h-full">
            <div className="max-w-md mx-auto md:mx-0 space-y-2 text-center md:text-left">
              <h3 className="text-lg text-foreground">
                Recharge your mind in minutes.
              </h3>
              <p className="text-sm font-regular text-muted-foreground">
                No previous meditation experience is required.
                <br></br>
                Just lay down, close your eyes and give it a try:
              </p>
            </div>
            <div className="max-w-md mx-auto md:mx-0 mt-8 md:mt-0">
              <AudioPlayer
                title="Guided Deep Rest Session"
                audioUrl="https://aubzrptwuziupzmwchaz.supabase.co/storage/v1/object/public/homepreviews/meditation-1746925567828.mp3"
                language="EN"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SolutionCard
