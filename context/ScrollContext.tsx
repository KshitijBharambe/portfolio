'use client';

import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

export const SECTIONS = ['home', 'about', 'projects', 'contact'] as const;
export type SectionName = (typeof SECTIONS)[number];

interface ScrollContextType {
  activeSection: number;
  direction: 1 | -1;
  goToSection: (index: number) => void;
  goToSectionByName: (name: SectionName) => void;
  nextSection: () => void;
  prevSection: () => void;
  isTransitioning: boolean;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScroll = () => useContext(ScrollContext);

const TRANSITION_DURATION = 600; // ms — matches framer-motion exit/enter overlap

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const goToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= SECTIONS.length || index === activeSection || cooldownRef.current) return;
      cooldownRef.current = true;
      setIsTransitioning(true);
      setDirection(index > activeSection ? 1 : -1);
      setActiveSection(index);

      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        cooldownRef.current = false;
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    },
    [activeSection],
  );

  const goToSectionByName = useCallback(
    (name: SectionName) => {
      const idx = SECTIONS.indexOf(name);
      if (idx !== -1) goToSection(idx);
    },
    [goToSection],
  );

  const nextSection = useCallback(() => goToSection(activeSection + 1), [activeSection, goToSection]);
  const prevSection = useCallback(() => goToSection(activeSection - 1), [activeSection, goToSection]);

  return (
    <ScrollContext.Provider
      value={{ activeSection, direction, goToSection, goToSectionByName, nextSection, prevSection, isTransitioning }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
