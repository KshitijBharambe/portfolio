"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

interface IntroSplashProps {
  onComplete?: () => void;
}

const SPLASH_KEY = "splashShown";

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [shaderPaused, setShaderPaused] = useState(false);
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(true);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Offloading animation logic to the GPU via Framer Motion controls
  const textControls = useAnimation();
  const shaderControls = useAnimation();
  const bgControls = useAnimation();

  useEffect(() => {
    // Issues 6 & 7: skip animation on page nav or subsequent reloads
    if (sessionStorage.getItem(SPLASH_KEY)) {
      setIsMounted(false);
      onCompleteRef.current?.();
      return;
    }

    sessionStorage.setItem(SPLASH_KEY, "1");

    const fireAnimations = async () => {
      // 1. "Playing" phase — let the shader vibe for 2 seconds
      await new Promise((res) => setTimeout(res, 2000));

      // 2. "ZoomOut" phase begins
      setShaderPaused(true); // Kill shader math immediately
      setPointerEventsEnabled(false); // Stop interactions

      // Fire GPU-heavy animations without React re-rendering the component tree
      textControls.start({
        scale: 8,
        opacity: 0,
        transition: { type: "spring", stiffness: 200, damping: 25, mass: 1 },
      });

      shaderControls.start({
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });

      // Wait 1 second
      await new Promise((res) => setTimeout(res, 1000));

      // 3. "Reveal" phase begins
      onCompleteRef.current?.();
      bgControls.start({
        opacity: 0,
        transition: { duration: 1.5, ease: "easeInOut" },
      });

      // Wait 1.8 seconds for the background to fully fade out
      await new Promise((res) => setTimeout(res, 1800));

      // 4. "Done" phase — Safely unmount everything
      setIsMounted(false);
    };

    fireAnimations();
  }, [textControls, shaderControls, bgControls]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          key="intro-splash"
          className="fixed inset-0 z-[60]"
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

          {/* Shader layer */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 1 }}
            initial={{ opacity: 1 }}
            animate={shaderControls}
          >
            <ShaderAnimation paused={shaderPaused} />
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
