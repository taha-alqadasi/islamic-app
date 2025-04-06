"use client"

import { useRef, useEffect } from "react"

interface QuranAudioVisualizerProps {
  isPlaying: boolean
  audioData?: number[]
  nightMode: boolean
}

export default function QuranAudioVisualizer({ isPlaying, audioData, nightMode }: QuranAudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate random audio data if not provided
  const generateRandomData = () => {
    return Array.from({ length: 100 }, () => Math.random() * 100)
  }

  // Draw the audio visualizer
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const render = () => {
      if (!isPlaying) {
        // If not playing, just draw a flat line
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.strokeStyle = nightMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
        ctx.stroke()
        return
      }

      // Get data to visualize
      const data = audioData || generateRandomData()

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw visualizer
      const barWidth = canvas.width / data.length
      const barMargin = 1
      const maxBarHeight = canvas.height - 10

      // Draw bars
      ctx.fillStyle = nightMode ? "#4f46e5" : "#3b82f6"

      data.forEach((value, index) => {
        const height = (value / 100) * maxBarHeight
        const x = index * barWidth + barMargin
        const y = canvas.height - height

        ctx.fillRect(x, y, barWidth - barMargin * 2, height)
      })

      // Continue animation
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [isPlaying, audioData, nightMode])

  return <canvas ref={canvasRef} width={500} height={80} className="w-full h-full rounded-md bg-primary/5" />
}

