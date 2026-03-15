"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

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
      const pos = generateRandomPos(width / 2, height / 2, (width + height) / 2)
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

function generateRandomPos(x: number, y: number, mag: number): Vector2D {
  const randomX = Math.random() * 1000
  const randomY = Math.random() * 500
  const direction = { x: randomX - x, y: randomY - y }
  const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
  if (magnitude > 0) {
    direction.x = (direction.x / magnitude) * mag
    direction.y = (direction.y / magnitude) * mag
  }
  return { x: x + direction.x, y: y + direction.y }
}

/* ─────────────────────────────────────────────
   Hero variant: renders two lines (KSHITIJ + BHARAMBE)
   once on mount with a configurable delay.
   Background is #050508 to match the portfolio bg.
───────────────────────────────────────────── */
interface HeroParticleNameProps {
  /** Milliseconds before the animation starts */
  delay?: number
}

export function HeroParticleName({ delay = 800 }: HeroParticleNameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const startedRef = useRef(false)

  const pixelSteps = 6
  const W = 1000
  const H = 320

  function spawnText() {
    const offscreen = document.createElement("canvas")
    offscreen.width = W
    offscreen.height = H
    const octx = offscreen.getContext("2d")!

    // Two-line name
    const fontSize = 130
    octx.fillStyle = "white"
    octx.font = `900 ${fontSize}px Arial`
    octx.textAlign = "center"
    octx.textBaseline = "alphabetic"
    octx.fillText("KSHITIJ", W / 2, H / 2 - 4)
    octx.fillText("BHARAMBE", W / 2, H / 2 + fontSize + 4)

    const imageData = octx.getImageData(0, 0, W, H)
    const pixels = imageData.data

    // Target color: indigo-400 (#818cf8)
    const targetColor = { r: 129, g: 140, b: 248 }

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

        let particle: Particle
        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()
          const randomPos = generateRandomPos(W / 2, H / 2, (W + H) / 2)
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y
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

  function animate(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Use page bg color for motion-blur trail
    ctx.fillStyle = "rgba(5, 5, 8, 0.15)"
    ctx.fillRect(0, 0, W, H)

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.move()
      p.draw(ctx)
      if (p.isKilled && (p.pos.x < 0 || p.pos.x > W || p.pos.y < 0 || p.pos.y > H)) {
        particles.splice(i, 1)
      }
    }

    animationRef.current = requestAnimationFrame(() => animate(canvas))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = W
    canvas.height = H

    // Fill with bg color initially
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "#050508"
    ctx.fillRect(0, 0, W, H)

    const timer = setTimeout(() => {
      if (!startedRef.current) {
        startedRef.current = true
        spawnText()
        animate(canvas)
      }
    }, delay)

    return () => {
      clearTimeout(timer)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-label="Kshitij Bharambe"
    />
  )
}


/* ─────────────────────────────────────────────
   General-purpose cycling variant (original behavior)
───────────────────────────────────────────── */
interface ParticleTextEffectProps {
  words?: string[]
}

const DEFAULT_WORDS = ["HELLO", "21st.dev", "ParticleTextEffect"]

export function ParticleTextEffect({ words = DEFAULT_WORDS }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)

  const pixelSteps = 6

  function nextWord(word: string, canvas: HTMLCanvasElement) {
    const offscreen = document.createElement("canvas")
    offscreen.width = canvas.width
    offscreen.height = canvas.height
    const octx = offscreen.getContext("2d")!
    octx.fillStyle = "white"
    octx.font = "bold 100px Arial"
    octx.textAlign = "center"
    octx.textBaseline = "middle"
    octx.fillText(word, canvas.width / 2, canvas.height / 2)

    const imageData = octx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const newColor = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255 }
    const particles = particlesRef.current
    let particleIndex = 0
    const coordsIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) coordsIndexes.push(i)
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }
    for (const coordIndex of coordsIndexes) {
      if (pixels[coordIndex + 3] > 0) {
        const x = (coordIndex / 4) % canvas.width
        const y = Math.floor(coordIndex / 4 / canvas.width)
        let particle: Particle
        if (particleIndex < particles.length) {
          particle = particles[particleIndex]; particle.isKilled = false; particleIndex++
        } else {
          particle = new Particle()
          const pos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
          particle.pos.x = pos.x; particle.pos.y = pos.y
          particle.maxSpeed = Math.random() * 6 + 4
          particle.maxForce = particle.maxSpeed * 0.05
          particle.colorBlendRate = Math.random() * 0.0275 + 0.0025
          particles.push(particle)
        }
        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = newColor; particle.colorWeight = 0
        particle.target.x = x; particle.target.y = y
      }
    }
    for (let i = particleIndex; i < particles.length; i++) particles[i].kill(canvas.width, canvas.height)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = 1000; canvas.height = 500
    nextWord(words[0], canvas)
    let rafId: number
    const loop = () => {
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = "rgba(0,0,0,0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((p, i) => {
        p.move(); p.draw(ctx)
        if (p.isKilled && (p.pos.x < 0 || p.pos.x > canvas.width || p.pos.y < 0 || p.pos.y > canvas.height)) {
          particlesRef.current.splice(i, 1)
        }
      })
      frameCountRef.current++
      if (frameCountRef.current % 240 === 0) {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        nextWord(words[wordIndexRef.current], canvas)
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    animationRef.current = rafId
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <canvas ref={canvasRef} className="border border-gray-800 rounded-lg" style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  )
}
