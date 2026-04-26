"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { HeroParticleName } from "@/components/ui/particle-text-effect";

/* ── Elegant floating shape ── */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  active = true,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute pointer-events-none", className)}
    >
      <motion.div
        animate={active ? { y: [0, 15, 0] } : { y: 0 }}
        transition={active ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border border-white/[0.08]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Animation variants — only fire when ready ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

interface HeroSectionProps {
  handleScrollToAbout: () => void;
  introComplete?: boolean;
}

export default function HeroSection({ handleScrollToAbout, introComplete = false }: HeroSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const animState = introComplete ? "visible" : "hidden";
  const animationsActive = introComplete && inView;

  return (
    <div ref={ref} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.04] via-transparent to-[var(--accent-2)]/[0.04] pointer-events-none" />

      {/* ── Floating elegant shapes ── */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={500}
          height={120}
          rotate={12}
          gradient="from-[var(--accent)]/[0.12]"
          active={animationsActive}
          className="left-[-10%] md:left-[-5%] top-[20%] md:top-[25%]"
        />
        <ElegantShape
          delay={0.5}
          width={400}
          height={100}
          rotate={-15}
          gradient="from-[var(--accent-2)]/[0.12]"
          active={animationsActive}
          className="right-[-5%] md:right-[0%] top-[65%] md:top-[70%]"
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={animState}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className={cn(animationsActive && "animate-ping", "absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-70")} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[var(--text-secondary)] uppercase">
            Backend Engineer &middot; AI Systems &middot; Distributed Cloud
            </span>
          </motion.div>

          {/* Display name — particle effect */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={animState}
            className="w-full max-w-3xl mx-auto"
          >
            {introComplete && <HeroParticleName delay={1000} />}
          </motion.div>

          {/* One-liner subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={animState}
            className="mt-6 text-sm sm:text-base font-mono tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            Shipping distributed systems, cloud-native microservices, and production AI integrations at scale.
          </motion.p>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none z-10"
        onClick={handleScrollToAbout}
        aria-label="Scroll down"
      >
        <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[0.35em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={animationsActive ? { y: [0, 6, 0] } : { y: 0 }}
          transition={animationsActive ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
          className="text-[var(--text-muted)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>

      {/* ── Bottom + top fade ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/70 pointer-events-none" />
    </div>
  );
}
