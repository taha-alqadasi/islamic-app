"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface QuranVisualizationProps {
  isPlaying: boolean
  audioTime: number
  duration: number
}

export function QuranVisualization({ isPlaying, audioTime, duration }: QuranVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Function to draw visualization
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / 200 // Adjust number of bars as needed
      const amplitude = canvas.height / 2

      for (let i = 0; i < 200; i++) {
        const x = i * barWidth
        // Create a simple sine wave that reacts to audio time
        const height = Math.sin(i + audioTime * 10) * amplitude * (isPlaying ? 1 : 0.2) + amplitude

        ctx.fillStyle = `hsl(${i}, 100%, 50%)` // Colorful bars
        ctx.fillRect(x, canvas.height / 2 - height / 2, barWidth, height)
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(draw)
    } else {
      cancelAnimationFrame(animationRef.current as number)
    }

    return () => {
      cancelAnimationFrame(animationRef.current as number)
    }
  }, [isPlaying, audioTime])

  return (
    <Card className="w-full h-40">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </Card>
  )
}

