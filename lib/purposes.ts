import {
  Moon,
  RefreshCw,
  Sun,
  Target,
  Eye,
  Plane,
  Dumbbell,
  Cloud,
} from "lucide-react"

export interface Purpose {
  id: string
  name: string
  icon: typeof Moon
  description?: string
}

export const purposes: Purpose[] = [
  {
    id: "restful-sleep",
    name: "Restful Sleep",
    icon: Moon,
    description: "Helps you fall asleep faster and enjoy deeper sleep",
  },
  {
    id: "brain-reset",
    name: "Brain Reset",
    icon: RefreshCw,
    description: "Clear your mind and reset your thinking patterns",
  },
  {
    id: "wake-up",
    name: "Wake Up",
    icon: Sun,
    description: "Energize your morning and start the day right",
  },
  {
    id: "focus",
    name: "Focus",
    icon: Target,
    description: "Enhance concentration and productivity",
  },
  {
    id: "lucid-dreaming",
    name: "Lucid Dreaming",
    icon: Eye,
    description: "Prepare the mind for vivid and conscious dreaming",
  },
  {
    id: "jet-lag-recovery",
    name: "Jet Lag Recovery",
    icon: Plane,
    description: "Realign your internal clock and recover from travel fatigue",
  },
  {
    id: "muscle-fatigue",
    name: "Muscle Fatigue",
    icon: Dumbbell,
    description: "Use deep relaxation to ease muscle fatigue",
  },
  {
    id: "relax",
    name: "Relax",
    icon: Cloud,
    description: "Reduce stress and anxiety",
  },
]
