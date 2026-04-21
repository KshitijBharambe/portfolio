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

/* ── Mobile detection hook ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const ClientHomePage: React.FC<ClientHomePageProps> = ({ projects = [] }) => {
  const scrollContext = useScroll();
  const [introComplete, setIntroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollContext);
  scrollRef.current = scrollContext;
  const isMobile = useIsMobile();

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  /* ── Reset internal scroll when section changes (desktop only) ── */
  useEffect(() => {
    if (!isMobile && sectionContentRef.current) {
      sectionContentRef.current.scrollTop = 0;
    }
  }, [scrollContext?.activeSection, isMobile]);

  /* ── Desktop: section-swap navigation listeners ── */
  useEffect(() => {
    if (isMobile) return; // Mobile uses natural scroll — no listeners needed

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
      if (document.body.style.overflow === "hidden") return;
      if (!isAtScrollBoundary(e.deltaY)) return;
      e.preventDefault();
      const ctx = getCtx();
      if (!ctx || ctx.isTransitioning) return;
      if (Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) ctx.nextSection();
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
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("navigate-section", handler);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobile]);

  /* ── Mobile: track active section via scroll position ── */
  useEffect(() => {
    if (!isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const sectionIds = ["mobile-home", "mobile-about", "mobile-projects", "mobile-contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1 && scrollContext) {
              scrollContext.goToSection(idx);
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Handle navigate-section events on mobile (from navbar)
    const handler = (e: Event) => {
      const name = (e as CustomEvent).detail;
      const idx = SECTIONS.indexOf(name);
      if (idx !== -1) {
        const el = document.getElementById(sectionIds[idx]);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("navigate-section", handler);

    return () => {
      observer.disconnect();
      window.removeEventListener("navigate-section", handler);
    };
  }, [isMobile, scrollContext]);

  if (!scrollContext) return null;

  const { activeSection, direction } = scrollContext;

  const handleScrollToAbout = () => {
    if (isMobile) {
      document.getElementById("mobile-about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollContext.goToSectionByName("about");
    }
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

  /* ═══ MOBILE: natural scroll layout ═══ */
  if (isMobile) {
    return (
      <>
        <IntroSplash onComplete={handleIntroComplete} />

        <div
          ref={containerRef}
          className="min-h-screen"
          style={{ background: "var(--bg)", color: "var(--foreground)" }}
        >
          {/* Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <EtheralShadow
              color="rgba(160,160,150,0.6)"
              animation={{ scale: 80, speed: 70 }}
              noise={{ opacity: 0.6, scale: 1.2 }}
              sizing="fill"
            />
          </div>

          {/* Sections stacked naturally */}
          <div className="relative z-[1]">
            <section id="mobile-home">
              <HeroSection handleScrollToAbout={handleScrollToAbout} introComplete={introComplete} />
            </section>
            <section id="mobile-about">
              <AboutMeSection />
            </section>
            <section id="mobile-projects">
              <ClientProjectsSection projects={projects} />
            </section>
            <section id="mobile-contact">
              <ContactSection />
              <Footer />
            </section>
          </div>
        </div>
      </>
    );
  }

  /* ═══ DESKTOP: section-swap layout ═══ */
  return (
    <>
      <IntroSplash onComplete={handleIntroComplete} />

      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden"
        style={{ background: "var(--bg)", color: "var(--foreground)" }}
      >
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

        {/* Section indicator dots — desktop only */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
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
