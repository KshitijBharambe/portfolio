"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeroParticleName } from "@/components/ui/particle-text-effect";

/* ── Elegant floating shape (from 21st.dev HeroGeometric pattern) ── */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
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
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.08]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

interface HeroSectionProps {
  handleScrollToAbout: () => void;
}

export default function HeroSection({ handleScrollToAbout }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.04] via-transparent to-[var(--accent-2)]/[0.04] pointer-events-none" />

      {/* ── Floating elegant shapes ── */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-[var(--accent)]/20"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-[var(--accent-2)]/20"
          className="right-[-5%] md:right-[0%] top-[65%] md:top-[70%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-400/15"
          className="left-[5%] md:left-[10%] bottom-[8%] md:bottom-[12%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-[var(--accent)]/10"
          className="right-[15%] md:right-[20%] top-[8%] md:top-[12%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-[var(--accent-2)]/10"
          className="left-[20%] md:left-[25%] top-[4%] md:top-[8%]"
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
            animate="visible"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
            </span>
            <span className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase">
              Cloud Engineer &middot; DevOps &middot; AWS
            </span>
          </motion.div>

          {/* Display name — particle effect */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full max-w-3xl mx-auto -my-4"
          >
            <HeroParticleName delay={900} />
          </motion.div>

          {/* Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 text-base sm:text-lg text-white/40 max-w-lg mx-auto leading-relaxed font-light tracking-wide"
          >
            Cloud-native Infrastructure Engineer with deep expertise in AWS,
            Terraform, and DevSecOps. Building resilient CI/CD pipelines and
            eliminating configuration drift at scale.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V8H8" />
              </svg>
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-outline"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Floating stat pills (desktop only) */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-[4%] top-1/2 -translate-y-1/2 flex flex-col gap-3"
            >
              {[
                { num: "3+", label: "Years Exp" },
                { num: "40%", label: "Faster Deploys" },
              ].map((s) => (
                <div
                  key={s.num}
                  className="px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-center"
                >
                  <div className="text-xl font-black text-[var(--accent)]">{s.num}</div>
                  <div className="text-[9px] font-mono text-white/30 tracking-wider uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-[4%] top-1/2 -translate-y-1/2 flex flex-col gap-3"
            >
              {[
                { num: "30%", label: "Cost Saved" },
                { num: "AWS", label: "Certified" },
              ].map((s) => (
                <div
                  key={s.num}
                  className="px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-center"
                >
                  <div className="text-xl font-black text-[var(--accent-2)]">{s.num}</div>
                  <div className="text-[9px] font-mono text-white/30 tracking-wider uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator (sibling of content, not nested inside it) ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none z-10"
        onClick={handleScrollToAbout}
        aria-label="Scroll down"
      >
        <span className="font-mono text-[9px] text-white/20 tracking-[0.35em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/20"
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
