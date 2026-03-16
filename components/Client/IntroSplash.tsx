"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

interface IntroSplashProps {
  onComplete?: () => void;
}

const SPLASH_KEY = "splashShown";

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [phase, setPhase] = useState<
    "playing" | "zoomOut" | "reveal" | "done"
  >("playing");

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Issues 6 & 7: skip animation on page nav or subsequent reloads
    if (sessionStorage.getItem(SPLASH_KEY)) {
      setPhase("done");
      onCompleteRef.current?.();
      return;
    }

    sessionStorage.setItem(SPLASH_KEY, "1");

    const t1 = setTimeout(() => setPhase("zoomOut"), 2000);
    const t2 = setTimeout(() => {
      setPhase("reveal");
      onCompleteRef.current?.();
    }, 3000);
    const t3 = setTimeout(() => setPhase("done"), 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Issue 5: pause shader RAF as soon as exit begins → smoother fade FPS
  const shaderPaused = phase === "zoomOut" || phase === "reveal";
  const revealing = phase === "reveal";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro-splash"
          className="fixed inset-0 z-[60]"
          style={{ pointerEvents: revealing ? "none" : "auto" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Black base */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "#000", zIndex: 0 }}
            animate={{ opacity: revealing ? 0 : 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Shader layer — paused during exit so GPU isn't fighting the fade */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 1 }}
            animate={{ opacity: shaderPaused ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <ShaderAnimation paused={shaderPaused} />
          </motion.div>

          {/* KB_ logo — zooms toward viewer */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 2, perspective: "800px" }}
          >
            <motion.span
              className="font-mono font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-widest"
              style={{
                textShadow:
                  "0 0 40px rgba(16,185,129,0.5), 0 0 80px rgba(16,185,129,0.2)",
              }}
              animate={{
                scale: shaderPaused ? 8 : 1,
                opacity: shaderPaused ? 0 : 1,
                filter: shaderPaused ? "blur(12px)" : "blur(0px)",
              }}
              transition={{
                scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.7, ease: "easeOut" },
                filter: { duration: 0.7, ease: "easeOut" },
              }}
            >
              KB_
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
