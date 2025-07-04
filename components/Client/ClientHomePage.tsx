"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "./HeroSection";
import AboutMeSection from "./AboutSection/ClientAboutSection";
import ClientProjectsSection from "./ClientProjectSection";
import ContactSection from "./ClientContactSection";
import Footer from "@/components/layout/Footer";
import { ScrollProvider, useScroll } from "@/context/ScrollContext";

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

const PageContent: React.FC<ClientHomePageProps> = ({ projects = [] }) => {
    const scrollContext = useScroll();

    if (!scrollContext) {
        return null;
    }

    const { homeSectionRef, aboutSectionRef, projectsSectionRef, contactSectionRef, scrollToSection } = scrollContext;

    const handleScrollToAbout = () => {
        if (aboutSectionRef) {
            scrollToSection(aboutSectionRef);
        }
    };

    // Handle wheel event for section navigation
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const sections = [
            homeSectionRef,
            aboutSectionRef,
            projectsSectionRef,
            contactSectionRef
        ].filter(Boolean) as React.RefObject<HTMLDivElement>[];

        const currentSectionIndex = sections.findIndex(ref => {
            const rect = ref.current?.getBoundingClientRect();
            return rect && rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });

        if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            // Scroll down to next section
            sections[currentSectionIndex + 1].current?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.deltaY < 0 && currentSectionIndex > 0) {
            // Scroll up to previous section
            sections[currentSectionIndex - 1].current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Add wheel event listener
    React.useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className="bg-black text-white h-screen overflow-hidden">
            <Navbar />
            <main className="h-full overflow-y-auto snap-y snap-mandatory">
                <section 
                    ref={homeSectionRef} 
                    className="h-screen w-full snap-start flex items-center justify-center"
                >
                    <HeroSection handleScrollToAbout={handleScrollToAbout} />
                </section>
                <section 
                    ref={aboutSectionRef} 
                    className="h-screen w-full snap-start flex items-center justify-center"
                >
                    <AboutMeSection />
                </section>
                <section 
                    ref={projectsSectionRef} 
                    className="h-screen w-full snap-start flex items-center justify-center"
                >
                    <ClientProjectsSection projects={projects} />
                </section>
                <section 
                    ref={contactSectionRef} 
                    className="h-screen w-full snap-start flex items-center justify-center"
                >
                    <ContactSection />
                </section>
                <Footer />
            </main>
        </div>
    );
};

const ClientHomePage: React.FC<ClientHomePageProps> = (props) => {
  return (
    <ScrollProvider>
      <PageContent {...props} />
    </ScrollProvider>
  );
};

export default ClientHomePage;
