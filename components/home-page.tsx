"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./sections/hero-section";
import AboutMeSection from "./sections/about-section";
import ClientProjectsSection from "./sections/projects-section";
import ContactSection from "./sections/contact-section";
import { useScroll, SECTIONS } from "@/context/ScrollContext";
import Footer from "@/components/layout/Footer";
import IntroSplash from "./intro-splash";
import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { LiquidGlassFilter, LiquidGlassToggle } from "@/components/ui/liquid-glass";
import { ProjectData } from "@/types/project";

interface ClientHomePageProps {
  projects?: ProjectData[];
}

/* ── Card-swap transition variants (GPU-only: transform + opacity) ── */
const sectionVariants = {
  enter: () => ({
    opacity: 0,
    scale: 0.92,
    y: "4%",
  }),
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: () => ({
    opacity: 0,
    scale: 0.92,
    y: "-4%",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ClientHomePage: React.FC<ClientHomePageProps> = ({ projects = [] }) => {
  const scrollContext = useScroll();
  const [introComplete, setIntroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollContext);
  scrollRef.current = scrollContext;

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  /* ── Reset internal scroll when section changes ── */
  useEffect(() => {
    if (sectionContentRef.current) {
      sectionContentRef.current.scrollTop = 0;
    }
  }, [scrollContext?.activeSection]);

  /* ── All navigation listeners (single useEffect, stable refs) ── */
  useEffect(() => {
    const getCtx = () => scrollRef.current;

    const handler = (e: Event) => {
      const ctx = getCtx();
      if (!ctx) return;
      const name = (e as CustomEvent).detail;
      ctx.goToSectionByName(name);
    };

    const isAtScrollBoundary = (deltaY: number): boolean => {
      const el = sectionContentRef.current;
      if (!el) return true;
      const hasOverflow = el.scrollHeight > el.clientHeight;
      if (!hasOverflow) return true;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (deltaY > 0 && !atBottom) return false;
      if (deltaY < 0 && !atTop) return false;
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      // Skip section navigation when a modal overlay is open
      if (document.body.style.overflow === "hidden") return;
      if (!isAtScrollBoundary(e.deltaY)) return;
      e.preventDefault();
      const ctx = getCtx();
      if (!ctx || ctx.isTransitioning) return;
      if (Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) ctx.nextSection();
      else ctx.prevSection();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (document.body.style.overflow === "hidden") return;
      const ctx = getCtx();
      if (!ctx || ctx.isTransitioning) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 60) return;
      if (!isAtScrollBoundary(deltaY)) return;
      if (deltaY > 0) ctx.nextSection();
      else ctx.prevSection();
    };

    const onKey = (e: KeyboardEvent) => {
      if (document.body.style.overflow === "hidden") return;
      const ctx = getCtx();
      if (!ctx || ctx.isTransitioning) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        ctx.nextSection();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        ctx.prevSection();
      }
    };

    window.addEventListener("navigate-section", handler);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("navigate-section", handler);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!scrollContext) return null;

  const { activeSection, direction } = scrollContext;

  const handleScrollToAbout = () => {
    scrollContext.goToSectionByName("about");
  };

  /* ── Render the active section ── */
  const renderSection = (index: number) => {
    switch (SECTIONS[index]) {
      case "home":
        return <HeroSection handleScrollToAbout={handleScrollToAbout} introComplete={introComplete} />;
      case "about":
        return <AboutMeSection />;
      case "projects":
        return <ClientProjectsSection projects={projects} />;
      case "contact":
        return (
          <>
            <ContactSection />
            <Footer />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* INTRO SPLASH */}
      <IntroSplash onComplete={handleIntroComplete} />

      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden"
        style={{ background: "var(--bg)", color: "var(--foreground)" }}
      >
        {/* Liquid glass SVG filter */}
        <LiquidGlassFilter />
        <LiquidGlassToggle />

        {/* ETHEREAL BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <EtheralShadow
            color="rgba(160,160,150,0.6)"
            animation={{ scale: 80, speed: 70 }}
            noise={{ opacity: 0.6, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        {/* SECTION PANE */}
        <AnimatePresence mode="sync" custom={direction}>
          <motion.section
            key={SECTIONS[activeSection]}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-[1] flex items-center justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <div
              ref={sectionContentRef}
              className="w-full h-full overflow-y-auto overflow-x-hidden"
            >
              {renderSection(activeSection)}
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Section indicator dots */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {SECTIONS.map((name, i) => (
            <button
              key={name}
              onClick={() => scrollContext.goToSection(i)}
              className="group relative flex items-center justify-center w-4 h-4 bg-transparent border-none cursor-pointer p-0"
              aria-label={`Go to ${name}`}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: i === activeSection ? 8 : 4,
                  height: i === activeSection ? 8 : 4,
                  backgroundColor: i === activeSection ? "var(--accent)" : "rgba(255,255,255,0.2)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
              {/* Tooltip */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] whitespace-nowrap pointer-events-none">
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClientHomePage;
