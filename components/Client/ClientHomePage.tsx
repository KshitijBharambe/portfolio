"use client";

import React from "react";
import HeroSection from "./HeroSection";
import AboutMeSection from "./AboutSection/ClientAboutSection";
import ClientProjectsSection from "./ClientProjectSection";
import ContactSection from "./ClientContactSection";
import { useScroll } from "@/context/ScrollContext";
import Footer from "@/components/layout/Footer";

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
    <div className="min-h-screen text-white flex flex-col relative bg-[var(--bg)]">
      {/* HERO */}
      <section
        id="home"
        ref={homeSectionRef}
        className="min-h-screen w-full flex items-center justify-center relative"
      >
        <HeroSection handleScrollToAbout={handleScrollToAbout} />
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="min-h-screen w-full flex items-center justify-center relative"
      >
        <div className="absolute top-0 left-0 w-full neon-line" />
        <AboutMeSection />
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        ref={projectsSectionRef}
        className="w-full flex justify-center relative"
      >
        <div className="absolute top-0 left-0 w-full neon-line" />
        <ClientProjectsSection projects={projects} />
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        ref={contactSectionRef}
        className="min-h-screen w-full flex items-center justify-center relative"
      >
        <div className="absolute top-0 left-0 w-full neon-line" />
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
};

export default ClientHomePage;
