"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, List } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AudioPlayerProps {
  nightMode: boolean
  fullScreenMode: boolean
  selectedReciter: number
  handleReciterChange: (reciterId: string) => void
  quranReciters: any[]
  showPlaylist: boolean
  setShowPlaylist: (show: boolean) => void
  showAudioVisualizer: boolean
  isPlaying: boolean
  handlePreviousVerse: () => void
  togglePlayPause: () => void
  handleNextVerse: () => void
  audioProgress: number
  audioDuration: number
  formatTime: (seconds: number) => string
  handleSeek: (value: number[]) => void
  toggleMute: () => void
  isMuted: boolean
  volume: number
  handleVolumeChange: (value: number[]) => void
  autoPlay: boolean
  setAutoPlay: (autoPlay: boolean) => void
  repeatVerse: boolean
  setRepeatVerse: (repeat: boolean) => void
  repeatCount: number
  setRepeatCount: (count: number) => void
  playbackSpeed: number
  handlePlaybackSpeedChange: (speed: number) => void
  handleDownloadSurah: () => void
  isDownloading: boolean
  downloadProgress: number
  currentSurah: any
  currentVerse: number
  setCurrentVerse: (verse: number) => void
  simulateAudioPlayback: () => void
  audioRef: React.RefObject<HTMLAudioElement>
  audioLoaded: boolean
  audioError: boolean
}

export default function AudioPlayer({
  nightMode,
  fullScreenMode,
  selectedReciter,
  handleReciterChange,
  quranReciters,
  showPlaylist,
  setShowPlaylist,
  showAudioVisualizer,
  isPlaying,
  handlePreviousVerse,
  togglePlayPause,
  handleNextVerse,
  audioProgress,
  audioDuration,
  formatTime,
  handleSeek,
  toggleMute,
  isMuted,
  volume,
  handleVolumeChange,
  autoPlay,
  setAutoPlay,
  repeatVerse,
  setRepeatVerse,
  repeatCount,
  setRepeatCount,
  playbackSpeed,
  handlePlaybackSpeedChange,
  handleDownloadSurah,
  isDownloading,
  downloadProgress,
  currentSurah,
  currentVerse,
  setCurrentVerse,
  simulateAudioPlayback,
  audioRef,
  audioLoaded,
  audioError,
}: AudioPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visualizerData, setVisualizerData] = useState<number[]>([])

  // Generate random data for audio visualizer
  useEffect(() => {
    if (showAudioVisualizer && isPlaying) {
      const interval = setInterval(() => {
        const newData = Array.from({ length: 50 }, () => Math.random() * 100)
        setVisualizerData(newData)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [showAudioVisualizer, isPlaying])

  // Draw audio visualizer
  useEffect(() => {
    if (canvasRef.current && showAudioVisualizer && visualizerData.length > 0) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const barWidth = canvas.width / visualizerData.length
        const barMargin = 2
        const maxBarHeight = canvas.height - 10

        ctx.fillStyle = nightMode ? "#4f46e5" : "#3b82f6"

        visualizerData.forEach((value, index) => {
          const height = (value / 100) * maxBarHeight
          const x = index * barWidth + barMargin
          const y = canvas.height - height

          ctx.fillRect(x, y, barWidth - barMargin * 2, height)
        })
      }
    }
  }, [visualizerData, showAudioVisualizer, nightMode])

  return (
    <Card
      className={`mt-4 ${nightMode ? "bg-gray-800 text-gray-100" : ""} ${fullScreenMode ? "fixed bottom-0 left-0 right-0 z-50" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Audio visualizer */}
          {showAudioVisualizer && (
            <div className="w-full h-20 mb-2">
              <canvas ref={canvasRef} width={500} height={80} className="w-full h-full rounded-md bg-primary/5" />
            </div>
          )}

          <div className="flex-1">
            {/* Current playing info */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm font-medium">
                  {currentSurah.name} {currentVerse > 0 ? `- آية ${currentVerse}` : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  {quranReciters.find((r) => r.id === selectedReciter)?.name}
                </p>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setShowPlaylist(!showPlaylist)}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>قائمة التشغيل</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleDownloadSurah}
                        disabled={isDownloading}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تنزيل السورة</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Download progress */}
            {isDownloading && <Progress value={downloadProgress} className="h-1 mb-4" />}

            {/* Audio controls */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePreviousVerse}>
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button variant="default" size="icon" className="h-10 w-10 rounded-full" onClick={togglePlayPause}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>

              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextVerse}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(audioProgress)}</span>
                <span>{formatTime(audioDuration)}</span>
              </div>
              <Slider
                value={[audioProgress]}
                max={audioDuration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className={nightMode ? "[&_[role=slider]]:bg-white" : ""}
              />
            </div>

            {/* Additional controls */}
            <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-20" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="auto-play" className="text-xs">
                    تلقائي
                  </Label>
                  <Switch id="auto-play" checked={autoPlay} onCheckedChange={setAutoPlay} className="scale-75" />
                </div>

                <div className="flex items-center gap-1">
                  <Label htmlFor="repeat-verse" className="text-xs">
                    تكرار
                  </Label>
                  <Switch
                    id="repeat-verse"
                    checked={repeatVerse}
                    onCheckedChange={setRepeatVerse}
                    className="scale-75"
                  />
                </div>

                <Select
                  value={playbackSpeed.toString()}
                  onValueChange={(value) => handlePlaybackSpeedChange(Number.parseFloat(value))}
                >
                  <SelectTrigger className="h-8 w-16 text-xs">
                    <SelectValue placeholder="1x" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Audio element (hidden) */}
        <audio ref={audioRef} preload="auto" />
      </CardContent>
    </Card>
  )
}

