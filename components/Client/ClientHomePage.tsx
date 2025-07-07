"use client";

import React from "react";

import HeroSection from "./HeroSection";
import AboutMeSection from "./AboutSection/ClientAboutSection";
import ClientProjectsSection from "./ClientProjectSection";
import ContactSection from "./ClientContactSection";

import { useScroll } from "@/context/ScrollContext";
import StarsCanvas from "./StarsBackground";
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
        scrollContainerRef,
        homeSectionRef, 
        aboutSectionRef, 
        projectsSectionRef, 
        contactSectionRef 
    } = scrollContext || {};

        const handleScrollToAbout = () => {
        if (scrollContext && scrollContext.aboutSectionRef) {
            scrollContext.scrollToSection(scrollContext.aboutSectionRef);
        }
    };

    React.useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && scrollContext) {
            let refToScroll: React.RefObject<HTMLDivElement | null> | undefined;
            if (hash === 'about') refToScroll = scrollContext.aboutSectionRef;
            else if (hash === 'projects') refToScroll = scrollContext.projectsSectionRef;
            else if (hash === 'contact') refToScroll = scrollContext.contactSectionRef;
            else if (hash === 'home') refToScroll = scrollContext.homeSectionRef;

            if (refToScroll) {
                setTimeout(() => {
                    scrollContext.scrollToSection(refToScroll);
                }, 150);
            }
        }
    }, [scrollContext]);

    if (!scrollContext) {
        return null;
    }

    return (
        <div className="min-h-screen text-white flex flex-col relative">
            <StarsCanvas />
            <div ref={scrollContainerRef} className="h-screen flex-1 overflow-y-auto snap-y snap-mandatory z-10">
                                <section id="home" ref={homeSectionRef} className="snap-start min-h-screen w-full flex items-center justify-center">
                    <HeroSection handleScrollToAbout={handleScrollToAbout} />
                </section>

                                                <section id="about" ref={aboutSectionRef} className="snap-start min-h-screen w-full flex items-center justify-center scroll-mt-20">
                    <AboutMeSection />
                </section>

                                                                                                                                <section id="projects" ref={projectsSectionRef} className="snap-start w-full flex justify-center scroll-mt-20">
                    <ClientProjectsSection projects={projects} />
                </section>

                                                                                                                                <section id="contact" ref={contactSectionRef} className="snap-start min-h-screen w-full flex items-center justify-center scroll-mt-20">
                    <ContactSection />
                </section>
                <Footer />
            </div>
        </div>
    );
};



export default ClientHomePage;
