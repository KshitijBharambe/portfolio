"use client";

import React, { useState, useCallback } from "react";
import HeroSection from "./HeroSection";
import AboutMeSection from "./AboutSection/ClientAboutSection";
import ClientProjectsSection from "./ClientProjectSection";
import ContactSection from "./ClientContactSection";
import { useScroll } from "@/context/ScrollContext";
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

const ClientHomePage: React.FC<ClientHomePageProps> = ({ projects = [] }) => {
  const scrollContext = useScroll();
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const {
    homeSectionRef,
    aboutSectionRef,
    projectsSectionRef,
    contactSectionRef,
  } = scrollContext || {};

  const handleScrollToAbout = () => {
    if (scrollContext?.aboutSectionRef) {
      scrollContext.scrollToSection(scrollContext.aboutSectionRef);
    }
  };

  // Scroll to top on every page load/refresh
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && scrollContext) {
      const map: Record<
        string,
        React.RefObject<HTMLDivElement | null> | undefined
      > = {
        about: scrollContext.aboutSectionRef,
        projects: scrollContext.projectsSectionRef,
        contact: scrollContext.contactSectionRef,
        home: scrollContext.homeSectionRef,
      };
      const ref = map[hash];
      if (ref) setTimeout(() => scrollContext.scrollToSection(ref), 150);
    }
  }, [scrollContext]);

  if (!scrollContext) return null;

  return (
    <>
      {/* INTRO SPLASH — outside main wrapper so it's unaffected by fade */}
      <IntroSplash onComplete={handleIntroComplete} />

      <div
        className="min-h-screen flex flex-col relative"
        style={{ background: "var(--bg)", color: "var(--foreground)" }}
      >
        {/* Liquid glass SVG filter — rendered once for all panels */}
        <LiquidGlassFilter />
        <LiquidGlassToggle />

        {/* ETHEREAL BACKGROUND — across entire page */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <EtheralShadow
            color="rgba(160,160,150,0.6)"
            animation={{ scale: 80, speed: 70 }}
            noise={{ opacity: 0.6, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        {/* HERO */}
        <section
          id="home"
          ref={homeSectionRef}
          className="min-h-screen w-full flex items-center justify-center relative z-[1]"
        >
          <HeroSection handleScrollToAbout={handleScrollToAbout} introComplete={introComplete} />
        </section>

        {/* ABOUT */}
        <section
          id="about"
          ref={aboutSectionRef}
          className="min-h-screen w-full flex items-center justify-center relative z-[1]"
        >
          <div className="absolute top-0 left-0 w-full neon-line" />
          <AboutMeSection />
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          ref={projectsSectionRef}
          className="w-full flex justify-center relative z-[1]"
        >
          <div className="absolute top-0 left-0 w-full neon-line" />
          <ClientProjectsSection projects={projects} />
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          ref={contactSectionRef}
          className="min-h-screen w-full flex items-center justify-center relative z-[1]"
        >
          <div className="absolute top-0 left-0 w-full neon-line" />
          <ContactSection />
        </section>

        <div className="relative z-[1]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ClientHomePage;
