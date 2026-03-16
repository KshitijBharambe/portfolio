"use client";
import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  radius: number;
  color: { r: number; g: number; b: number };
  vx: number;
  vy: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

// Adapted from 21st.dev AuroraCanvas — recolored for cyan/purple/teal palette
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let mounted = true;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Matching our design palette
    const colors = [
      { r: 0,   g: 229, b: 255 }, // cyan    #00e5ff
      { r: 168, g: 85,  b: 247 }, // purple  #a855f7
      { r: 0,   g: 180, b: 216 }, // teal-cyan
      { r: 88,  g: 28,  b: 200 }, // deep purple
      { r: 6,   g: 182, b: 212 }, // cyan-600
    ];

    const orbs: Orb[] = [];
    for (let i = 0; i < 9; i++) {
      orbs.push({
        x:          Math.random() * canvas.width,
        y:          Math.random() * canvas.height,
        radius:     Math.random() * 350 + 150,
        color:      colors[Math.floor(Math.random() * colors.length)],
        vx:         (Math.random() - 0.5) * 0.3,
        vy:         (Math.random() - 0.5) * 0.3,
        opacity:    Math.random() * 0.07 + 0.04,
        pulseSpeed: Math.random() * 0.001 + 0.0005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    function draw() {
      if (!ctx || !canvas || !mounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      orbs.forEach((orb) => {
        // Gentle drift
        orb.x += orb.vx + Math.sin(time * 0.0008 + orb.pulsePhase) * 0.4;
        orb.y += orb.vy + Math.cos(time * 0.0006 + orb.pulsePhase) * 0.4;

        // Wrap around
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Pulsing opacity
        const pulsed = orb.opacity + Math.sin(time * orb.pulseSpeed + orb.pulsePhase) * 0.02;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},${pulsed})`);
        grad.addColorStop(0.5, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},${pulsed * 0.5})`);
        grad.addColorStop(1, `rgba(${orb.color.r},${orb.color.g},${orb.color.b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, background: "#050505" }}
    />
  );
}
