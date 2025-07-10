"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useScroll } from "@/context/ScrollContext";

// Animated tech words that will rotate
const techWords = [
 "Backend Engineer",
  "DevOps Enthusiast",
  "Cloud Builder",
  "CI/CD Tinkerer",
  "Automation Guy",
  "Python in One Hand, Bash in the Other",
];

interface HeroSectionProps {
  handleScrollToAbout?: () => void;
}

export default function HeroSection({ handleScrollToAbout }: HeroSectionProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const scrollContext = useScroll();

  // Handle scroll to about section
  const handleScrollToAboutClick = () => {
    if (handleScrollToAbout) {
      handleScrollToAbout();
    } else if (scrollContext?.aboutSectionRef?.current) {
      scrollContext.scrollToSection(scrollContext.aboutSectionRef);
    }
  };

  // Ref for the hero section container
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Typing and backspacing effect
  useEffect(() => {
    const currentWord = techWords[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        } else {
          // Move to next word after deleting
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % techWords.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // Determine if cursor should blink
  const shouldBlink =
    !isDeleting && currentText === techWords[currentWordIndex];

  // Variants for main content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Floating elements animation
  // const floatingAnimation = {
  //   y: ["-10px", "10px", "-10px"],
  //   transition: {
  //     duration: 4,
  //     repeat: Infinity,
  //     ease: "easeInOut",
  //   },
  // };

  // Animation variants for content

  return (
    <div
      ref={heroSectionRef}
      className="min-h-screen w-full relative flex items-center justify-center"
    >
      {/* Content container */}
      <div className="z-10 container mx-auto px-8 md:px-12 lg:max-w-6xl">
        <motion.div
          className="relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Main title with glowing effect */}
          <motion.h1
            variants={itemVariants}
            className="font-mono font-bold text-6xl sm:text-7xl md:text-8xl text-white mb-6 tracking-tighter text-glow"
          >
            Kshitij <span className="text-blue-500">B</span>
          </motion.h1>

          {/* Developer byline with typing animation */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 px-4 py-2 rounded-full mb-8"
          >
            <div className="flex items-center">
              <span className="text-green-400 text-lg sm:text-xl mr-2">
                &gt;
              </span>
              <span className="text-lg sm:text-xl text-gray-200 mr-2">
{/*                 <span className="text-blue-400">const</span>{" "} */}
                <span className="text-yellow-400">iAm:</span>{" "}
              </span>
              <motion.span className="font-mono text-lg sm:text-xl text-purple-400">
                &quot;{currentText}&quot;
                <span
                  className={`text-white text-lg sm:text-xl ml-1 ${
                    shouldBlink ? 'animate-blink' : 'opacity-100'
                  }`}
                >
                  |
                </span>
              </motion.span>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-xl mb-10"
          >
            DevOps and Cloud enthusiast building secure, scalable backend systems that aspire to run in production someday.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.button
              onClick={handleScrollToAboutClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 flex items-center shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore My Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-4 mt-10">
            <motion.a
              href="https://github.com/KshitijBharambe"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "#ffffff" }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kshitijbharambe/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "#ffffff" }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://twitter.com/KSHTJ30"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "#ffffff" }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
