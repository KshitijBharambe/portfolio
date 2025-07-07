'use client';

import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface ScrollContextType {
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  homeSectionRef: React.MutableRefObject<HTMLDivElement | null>;
  aboutSectionRef: React.MutableRefObject<HTMLDivElement | null>;
  projectsSectionRef: React.MutableRefObject<HTMLDivElement | null>;
  contactSectionRef: React.MutableRefObject<HTMLDivElement | null>;
  scrollToSection: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScroll = () => {
  return useContext(ScrollContext);
};

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const homeSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
        if (ref?.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const value: ScrollContextType = {
    scrollContainerRef,
    homeSectionRef,
    aboutSectionRef,
    projectsSectionRef,
    contactSectionRef,
    scrollToSection,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};
