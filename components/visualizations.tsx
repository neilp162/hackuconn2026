"use client"

import { useEffect, useRef, useCallback } from "react"

interface VisualizationProps {
  className?: string
}

// --- Area Under Curve (interactive: drag the bounds) ---
export function AreaUnderCurveVisualization({ className }: VisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height
    const pad = 50
    const gw = w - pad * 2
    const gh = h - pad * 2

    timeRef.current += 0.02

    ctx.clearRect(0, 0, w, h)

    // Subtle grid
    ctx.strokeStyle = "oklch(0.92 0 0)"
    ctx.lineWidth = 1
    for (let i = 0; i <= 8; i++) {
      const x = pad + (gw * i) / 8
      const y = pad + (gh * i) / 8
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, pad + gh); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(pad + gw, y); ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = "oklch(0.45 0 0)"
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(pad, pad + gh); ctx.lineTo(pad + gw, pad + gh); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, pad + gh); ctx.stroke()

    // Axis labels
    ctx.fillStyle = "oklch(0.45 0 0)"
    ctx.font = "bold 11px monospace"
    ctx.textAlign = "center"
    ctx.fillText("x", pad + gw + 15, pad + gh + 5)
    ctx.fillText("y", pad - 5, pad - 10)

    // f(x) = x^2 mapped to graph
    const f = (normX: number) => normX * normX
    const maxY = 1.1

    // Animated fill bounds
    const fillEnd = 0.3 + 0.5 * ((Math.sin(timeRef.current * 0.8) + 1) / 2)

    // Filled area
    ctx.beginPath()
    ctx.moveTo(pad, pad + gh)
    for (let px = 0; px <= gw * fillEnd; px++) {
      const normX = px / gw
      const normY = f(normX) / maxY
      ctx.lineTo(pad + px, pad + gh - normY * gh)
    }
    ctx.lineTo(pad + gw * fillEnd, pad + gh)
    ctx.closePath()
    ctx.fillStyle = "oklch(0.55 0.17 155 / 0.15)"
    ctx.fill()

    // Curve
    ctx.strokeStyle = "oklch(0.55 0.17 155)"
    ctx.lineWidth = 3
    ctx.beginPath()
    for (let px = 0; px <= gw; px++) {
      const normX = px / gw
      const normY = f(normX) / maxY
      const x = pad + px
      const y = pad + gh - normY * gh
      if (px === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Bound marker
    const bx = pad + gw * fillEnd
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = "oklch(0.55 0.17 155 / 0.5)"
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(bx, pad); ctx.lineTo(bx, pad + gh); ctx.stroke()
    ctx.setLineDash([])

    // Area value label
    const area = (fillEnd * fillEnd * fillEnd / 3).toFixed(3)
    ctx.fillStyle = "oklch(0.35 0.10 155)"
    ctx.font = "bold 13px monospace"
    ctx.textAlign = "center"
    ctx.fillText(`Area = ${area}`, pad + gw * fillEnd / 2, pad + gh - 20)

    // Function label
    ctx.fillStyle = "oklch(0.45 0 0)"
    ctx.font = "bold 12px monospace"
    ctx.textAlign = "left"
    ctx.fillText("f(x) = x\u00B2", pad + 8, pad + 20)

    // X labels
    ctx.fillStyle = "oklch(0.55 0 0)"
    ctx.font = "11px monospace"
    ctx.textAlign = "center"
    ctx.fillText("0", pad, pad + gh + 18)
    ctx.fillText(fillEnd.toFixed(1), bx, pad + gh + 18)
    ctx.fillText("1", pad + gw, pad + gh + 18)

    animFrameRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [draw])

  return (
    <div className={className}>
      <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
        <div className="px-4 py-2.5 border-b-2 border-border bg-muted/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-primary/60" />
            <div className="size-2.5 rounded-full bg-primary/30" />
            <div className="size-2.5 rounded-full bg-primary/15" />
          </div>
          <span className="text-xs font-mono text-muted-foreground ml-1">INTERACTIVE: Area Under a Curve</span>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 300 }}
          aria-label="Animated visualization showing the area under f(x) = x squared, with a sweeping bound that changes the shaded region"
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground text-center leading-relaxed">
        The shaded area under f(x) = x² grows as the upper bound sweeps right. The integral gives the exact area.
      </p>
    </div>
  )
}

// --- Riemann Sum Visualization ---
export function RiemannSumVisualization({ className }: VisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height
    const pad = 50
    const gw = w - pad * 2
    const gh = h - pad * 2

    timeRef.current += 0.008

    ctx.clearRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = "oklch(0.92 0 0)"
    ctx.lineWidth = 1
    for (let i = 0; i <= 8; i++) {
      const x = pad + (gw * i) / 8
      const y = pad + (gh * i) / 8
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, pad + gh); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(pad + gw, y); ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = "oklch(0.45 0 0)"
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(pad, pad + gh); ctx.lineTo(pad + gw, pad + gh); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, pad + gh); ctx.stroke()

    const f = (x: number) => x * x
    const maxY = 1.1

    // Animate number of rectangles: cycle 4 -> 8 -> 16 -> 32
    const cycle = Math.floor(timeRef.current % 4)
    const nRects = [4, 8, 16, 32][cycle]
    const rectW = gw / nRects

    // Draw rectangles (left Riemann sum)
    let sum = 0
    for (let i = 0; i < nRects; i++) {
      const normX = i / nRects
      const val = f(normX)
      sum += val / nRects
      const rh = (val / maxY) * gh

      ctx.fillStyle = "oklch(0.55 0.17 155 / 0.2)"
      ctx.fillRect(pad + i * rectW, pad + gh - rh, rectW, rh)

      ctx.strokeStyle = "oklch(0.55 0.17 155 / 0.5)"
      ctx.lineWidth = 1
      ctx.strokeRect(pad + i * rectW, pad + gh - rh, rectW, rh)
    }

    // Actual curve on top
    ctx.strokeStyle = "oklch(0.55 0.17 155)"
    ctx.lineWidth = 3
    ctx.beginPath()
    for (let px = 0; px <= gw; px++) {
      const normX = px / gw
      const normY = f(normX) / maxY
      if (px === 0) ctx.moveTo(pad + px, pad + gh - normY * gh)
      else ctx.lineTo(pad + px, pad + gh - normY * gh)
    }
    ctx.stroke()

    // Labels
    ctx.fillStyle = "oklch(0.35 0.10 155)"
    ctx.font = "bold 13px monospace"
    ctx.textAlign = "right"
    ctx.fillText(`n = ${nRects}  |  Sum \u2248 ${sum.toFixed(4)}`, pad + gw - 4, pad + 20)

    ctx.fillStyle = "oklch(0.50 0 0)"
    ctx.font = "11px monospace"
    ctx.fillText("Exact = 0.3333", pad + gw - 4, pad + 38)

    // Function label
    ctx.fillStyle = "oklch(0.45 0 0)"
    ctx.font = "bold 12px monospace"
    ctx.textAlign = "left"
    ctx.fillText("f(x) = x\u00B2, [0,1]", pad + 8, pad + gh + 18)

    animFrameRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [draw])

  return (
    <div className={className}>
      <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
        <div className="px-4 py-2.5 border-b-2 border-border bg-muted/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-primary/60" />
            <div className="size-2.5 rounded-full bg-primary/30" />
            <div className="size-2.5 rounded-full bg-primary/15" />
          </div>
          <span className="text-xs font-mono text-muted-foreground ml-1">INTERACTIVE: Riemann Sums</span>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 300 }}
          aria-label="Animated visualization showing Riemann sum approximation improving as the number of rectangles increases from 4 to 32"
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground text-center leading-relaxed">
        As the number of rectangles increases (4, 8, 16, 32), the Riemann sum converges to the true integral value of 1/3.
      </p>
    </div>
  )
}
