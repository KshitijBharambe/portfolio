"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

/* ── Color palettes — emerald/amber scheme ── */
const COLOR_PALETTES = [
  // emerald (initial)
  { from: { r: 16, g: 185, b: 129 }, to: { r: 16, g: 185, b: 129 } },
  // emerald → amber gradient
  { from: { r: 16, g: 185, b: 129 }, to: { r: 245, g: 158, b: 11 } },
  // teal → emerald gradient
  { from: { r: 20, g: 184, b: 166 }, to: { r: 52, g: 211, b: 153 } },
  // amber → warm orange gradient
  { from: { r: 245, g: 158, b: 11 }, to: { r: 249, g: 115, b: 22 } },
  // sage → emerald
  { from: { r: 132, g: 204, b: 22 }, to: { r: 16, g: 185, b: 129 } },
  // pure emerald (reset)
  { from: { r: 16, g: 185, b: 129 }, to: { r: 16, g: 185, b: 129 } },
]

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2)
    )
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }
    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }
    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }
    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }
    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }
    this.acc.x += steer.x
    this.acc.y += steer.y
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const pos = generateEdgePos(width, height)
      this.target.x = pos.x
      this.target.y = pos.y
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 5, g: 5, b: 8 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }
}

/** Spawn position from the edges of the canvas */
function generateEdgePos(width: number, height: number): Vector2D {
  const edge = Math.floor(Math.random() * 4)
  const margin = 50 // overshoot past edge
  switch (edge) {
    case 0: // top
      return { x: Math.random() * width, y: -margin }
    case 1: // right
      return { x: width + margin, y: Math.random() * height }
    case 2: // bottom
      return { x: Math.random() * width, y: height + margin }
    default: // left
      return { x: -margin, y: Math.random() * height }
  }
}

/* ─────────────────────────────────────────────
   Hero variant: renders two lines (KSHITIJ + BHARAMBE)
   Particles spawn from screen edges and converge inward.
───────────────────────────────────────────── */
interface HeroParticleNameProps {
  delay?: number
}

export function HeroParticleName({ delay = 800 }: HeroParticleNameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const startedRef = useRef(false)
  const frameCountRef = useRef(0)
  const runningRef = useRef(false)

  const pixelSteps = 6
  const W = 1000
  const H = 320
  const SETTLE_DISTANCE = 1.5
  const SETTLE_SPEED = 0.2
  const MAX_SETTLE_FRAMES = 900

  function spawnText(paletteIndex: number) {
    const offscreen = document.createElement("canvas")
    offscreen.width = W
    offscreen.height = H
    const octx = offscreen.getContext("2d")!

    const fontSize = 130
    octx.fillStyle = "white"
    octx.font = `900 ${fontSize}px Arial`
    octx.textAlign = "center"
    octx.textBaseline = "alphabetic"
    octx.fillText("KSHITIJ P.", W / 2, H / 2 - 4)
    octx.fillText("BHARAMBE", W / 2, H / 2 + fontSize + 4)

    const imageData = octx.getImageData(0, 0, W, H)
    const pixels = imageData.data

    const palette = COLOR_PALETTES[paletteIndex % COLOR_PALETTES.length]

    const particles = particlesRef.current
    let particleIndex = 0

    const coordsIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i)
    }
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    for (const coordIndex of coordsIndexes) {
      const alpha = pixels[coordIndex + 3]
      if (alpha > 0) {
        const x = (coordIndex / 4) % W
        const y = Math.floor(coordIndex / 4 / W)

        const t = x / W
        const targetColor = {
          r: Math.round(palette.from.r + (palette.to.r - palette.from.r) * t),
          g: Math.round(palette.from.g + (palette.to.g - palette.from.g) * t),
          b: Math.round(palette.from.b + (palette.to.b - palette.from.b) * t),
        }

        let particle: Particle
        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()
          // Spawn from edges of the canvas
          const edgePos = generateEdgePos(W, H)
          particle.pos.x = edgePos.x
          particle.pos.y = edgePos.y
          particle.maxSpeed = Math.random() * 6 + 4
          particle.maxForce = particle.maxSpeed * 0.05
          particle.particleSize = Math.random() * 6 + 6
          particle.colorBlendRate = Math.random() * 0.025 + 0.003
          particles.push(particle)
        }

        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = targetColor
        particle.colorWeight = 0
        particle.target.x = x
        particle.target.y = y
      }
    }
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(W, H)
    }
  }

  const visibleRef = useRef(true)

  function animate(canvas: HTMLCanvasElement) {
    if (document.hidden || !visibleRef.current) {
      runningRef.current = false
      animationRef.current = 0
      return
    }

    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    ctx.clearRect(0, 0, W, H)

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.move()
      p.draw(ctx)
      if (p.isKilled && (p.pos.x < 0 || p.pos.x > W || p.pos.y < 0 || p.pos.y > H)) {
        particles.splice(i, 1)
      }
    }

    frameCountRef.current++

    const allSettled = particles.every((p) => {
      if (p.isKilled) return false
      const dx = p.pos.x - p.target.x
      const dy = p.pos.y - p.target.y
      const speed = Math.sqrt(p.vel.x * p.vel.x + p.vel.y * p.vel.y)
      return Math.sqrt(dx * dx + dy * dy) <= SETTLE_DISTANCE && speed <= SETTLE_SPEED
    })

    if (allSettled || frameCountRef.current >= MAX_SETTLE_FRAMES) {
      stopLoop()
      return
    }

    animationRef.current = requestAnimationFrame(() => animate(canvas))
  }

  function startLoop(canvas: HTMLCanvasElement) {
    if (runningRef.current || document.hidden || !visibleRef.current) return
    runningRef.current = true
    animationRef.current = requestAnimationFrame(() => animate(canvas))
  }

  function stopLoop() {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    animationRef.current = 0
    runningRef.current = false
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = W
    canvas.height = H

    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, W, H)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && startedRef.current) startLoop(canvas)
        else stopLoop()
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop()
      else if (startedRef.current) startLoop(canvas)
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const timer = setTimeout(() => {
      if (!startedRef.current) {
        startedRef.current = true
        frameCountRef.current = 0
        spawnText(0)
        startLoop(canvas)
      }
    }, delay)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      stopLoop()
      particlesRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-label="Kshitij Pritish Bharambe"
    />
  )
}
