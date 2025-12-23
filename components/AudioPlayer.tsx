"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Pause, Languages } from "lucide-react"
import { InfoPill } from "./InfoPill"

interface AudioPlayerProps {
  title: string
  audioUrl: string
  language?: string
}

export default function AudioPlayer({ title, audioUrl, language = "EN" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [audioRef])

  // Format time in MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return

    const progressBar = progressBarRef.current
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width

    audioRef.current.currentTime = pos * duration
  }

  return (
    <div className="max-w-md w-full bg-black rounded-lg p-4 text-white 
    border border-muted hover:border-selection-text/40 hover:bg-card 
    transition-colors duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md text-muted-foreground">{title}</h2>
        <div className="flex items-center space-x-1 opacity-70">
          <InfoPill icon={Languages} label="Language" value={language} />
        </div>

      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className={`w-10 h-10 flex items-center justify-center rounded transition-all duration-200 active:scale-90
    ${isPlaying
              ? "bg-accent text-foreground hover:bg-accent/90"
              : "bg-primary text-background hover:bg-primary/90"
            }`}
        >
          {isPlaying ? <Pause fill="white" size={16} /> : (<img src="/play.svg" alt="Play" width={16} height={16} />)}
        </button>


        <div className="flex-1 flex items-center space-x-2">
          <span className="text-xs text-muted-foreground w-10">{formatTime(currentTime)}</span>

          <div
            ref={progressBarRef}
            onClick={handleProgressChange}
            className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer relative"
          >
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[10px] bg-white" />
            </div>
          </div>

          <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  )
}
