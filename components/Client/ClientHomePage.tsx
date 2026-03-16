"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import AboutMeSection from "./AboutSection/ClientAboutSection";
import ClientProjectsSection from "./ClientProjectSection";
import ContactSection from "./ClientContactSection";
import { useScroll, SECTIONS } from "@/context/ScrollContext";
import Footer from "@/components/layout/Footer";
import IntroSplash from "./IntroSplash";
import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { LiquidGlassFilter, LiquidGlassToggle } from "@/components/ui/liquid-glass";

export interface ProjectData {
  id: number | string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  technologies: string;
  githubLink: string;
  demoLink: string;
  fullDescription: string;
}

interface ClientHomePageProps {
  projects?: ProjectData[];
}

/* ── Slide transition variants ── */
const sectionVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    filter: "blur(12px)",
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-80%" : "80%",
    opacity: 0,
    scale: 0.92,
    filter: "blur(10px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ClientHomePage: React.FC<ClientHomePageProps> = ({ projects = [] }) => {
  const scrollContext = useScroll();
  const [introComplete, setIntroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  /* ── Reset internal scroll when section changes ── */
  useEffect(() => {
    if (sectionContentRef.current) {
      sectionContentRef.current.scrollTop = 0;
    }
  }, [scrollContext?.activeSection]);

  /* ── Custom navigation events (from CTA buttons etc.) ── */
  useEffect(() => {
    if (!scrollContext) return;
    const handler = (e: Event) => {
      const name = (e as CustomEvent).detail;
      scrollContext.goToSectionByName(name);
    };
    window.addEventListener("navigate-section", handler);
    return () => window.removeEventListener("navigate-section", handler);
  }, [scrollContext]);

  /* ── Wheel / scroll hijack ── */
  useEffect(() => {
    if (!scrollContext) return;
    const { nextSection, prevSection, isTransitioning } = scrollContext;

    const onWheel = (e: WheelEvent) => {
      // Allow internal scrolling for overflowing section content
      const el = sectionContentRef.current;
      if (el) {
        const hasOverflow = el.scrollHeight > el.clientHeight;
        if (hasOverflow) {
          const atTop = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          // Only hijack if we're at the boundary in scroll direction
          if (e.deltaY > 0 && !atBottom) return;
          if (e.deltaY < 0 && !atTop) return;
        }
      }

      e.preventDefault();
      if (isTransitioning) return;
      if (Math.abs(e.deltaY) < 30) return; // ignore tiny trackpad ticks

      if (e.deltaY > 0) nextSection();
      else prevSection();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [scrollContext]);

  /* ── Touch swipe ── */
  useEffect(() => {
    if (!scrollContext) return;
    const { nextSection, prevSection, isTransitioning } = scrollContext;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 60) return;

      // Same internal-scroll boundary check
      const el = sectionContentRef.current;
      if (el) {
        const hasOverflow = el.scrollHeight > el.clientHeight;
        if (hasOverflow) {
          const atTop = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          if (deltaY > 0 && !atBottom) return;
          if (deltaY < 0 && !atTop) return;
        }
      }

      if (deltaY > 0) nextSection();
      else prevSection();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [scrollContext]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (!scrollContext) return;
    const { nextSection, prevSection, isTransitioning } = scrollContext;

    const onKey = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        nextSection();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevSection();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollContext]);

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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.section
            key={SECTIONS[activeSection]}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-[1] flex items-center justify-center"
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
