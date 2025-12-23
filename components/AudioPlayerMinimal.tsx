"use client"

import React, { useState, useRef, useEffect } from "react"
import { Pause } from "lucide-react"

interface AudioPlayerMinimalProps {
  audioUrl: string
}

export default function AudioPlayerMinimal({ audioUrl }: AudioPlayerMinimalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => setDuration(audio.duration)
    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:
${seconds.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.pause()
    else audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = pos * duration
  }

  return (
    <div className="max-w-md w-full bg-black rounded-lg p-4 text-white border border-muted hover:border-selection-text/40 hover:bg-card transition-colors duration-300 ease-in-out">
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className={`w-10 h-10 flex items-center justify-center rounded transition-all duration-200 active:scale-90
          ${isPlaying ? "bg-accent text-foreground hover:bg-accent/90" : "bg-primary text-background hover:bg-primary/90"}`}
        >
          {isPlaying ? <Pause fill="white" size={16} /> : (<img src="/play.svg" alt="Play" width={16} height={16} />)}
        </button>

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

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  )
}
