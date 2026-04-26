"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

interface IntroSplashProps {
  onComplete?: () => void;
}

const SPLASH_KEY = "splashShown";
const SPLASH_COMPLETE_EVENT = "intro-splash-complete";

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [shaderPaused, setShaderPaused] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(true);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Offloading animation logic to the GPU via Framer Motion controls
  const textControls = useAnimation();
  const bgControls = useAnimation();

  useEffect(() => {
    // Skip animation on page nav or subsequent reloads
    if (sessionStorage.getItem(SPLASH_KEY)) {
      const id = window.setTimeout(() => {
        setPointerEventsEnabled(false);
        onCompleteRef.current?.();
        globalThis.dispatchEvent(new Event(SPLASH_COMPLETE_EVENT));
        setIsMounted(false);
      }, 0);

      return () => window.clearTimeout(id);
    }

    let cancelled = false;

    const delay = (ms: number) =>
      new Promise<void>((res) => {
        const id = setTimeout(() => { if (!cancelled) res(); }, ms);
        // Store for cleanup
        timerIds.push(id);
      });

    const timerIds: ReturnType<typeof setTimeout>[] = [];

    const fireAnimations = async () => {
      // Small delay before shader starts to let the page settle
      await delay(500);
      if (cancelled) return;
      setShaderReady(true);

      await delay(1500);
      if (cancelled) return;

      setShaderPaused(true);
      setPointerEventsEnabled(false);

      textControls.start({
        scale: 8,
        opacity: 0,
        transition: { type: "spring", stiffness: 200, damping: 25, mass: 1 },
      });

      setShaderReady(false);

      await delay(1000);
      if (cancelled) return;

      sessionStorage.setItem(SPLASH_KEY, "1");
      onCompleteRef.current?.();
      globalThis.dispatchEvent(new Event(SPLASH_COMPLETE_EVENT));
      bgControls.start({
        opacity: 0,
        transition: { duration: 1.5, ease: "easeInOut" },
      });

      await delay(1800);
      if (cancelled) return;

      setIsMounted(false);
    };

    fireAnimations();

    return () => {
      cancelled = true;
      timerIds.forEach(clearTimeout);
    };
  }, [textControls, bgControls]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          key="intro-splash"
          className="fixed inset-0 z-[90]"
          style={{ pointerEvents: pointerEventsEnabled ? "auto" : "none" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Black base */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "#000", zIndex: 0 }}
            initial={{ opacity: 1 }}
            animate={bgControls}
          />

          {/* Shader layer — delayed 0.5s to let the page settle */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={shaderReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {shaderReady && <ShaderAnimation paused={shaderPaused} />}
          </motion.div>

          {/* KB_ logo — wrapper locked to a hardware-accelerated layer */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: 2,
              perspective: "800px",
              transform: "translateZ(0)", // Forces a composite layer
            }}
          >
            <motion.span
              className="font-mono font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-widest"
              style={{
                color: "#fff",
                textShadow:
                  "0 0 40px rgba(16,185,129,0.5), 0 0 80px rgba(16,185,129,0.2)",
                willChange: "transform, opacity",
                // The dark magic tweaks: flattens the rendering path
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
                transformStyle: "preserve-3d",
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={textControls}
            >
              KB_
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
