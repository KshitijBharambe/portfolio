"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion } from "framer-motion";
import { useScroll } from "@/context/ScrollContext";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const scrollContext = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (handler: () => void) => {
    handler();
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const renderNavLink = (label: string, target: string) => {
    const isHomePage = pathname === '/';
    let scrollRef: React.MutableRefObject<HTMLDivElement | null> | null = null;

    if (isHomePage && scrollContext) {
        switch (target) {
            case 'home': scrollRef = scrollContext.homeSectionRef; break;
            case 'about': scrollRef = scrollContext.aboutSectionRef; break;
            case 'projects': scrollRef = scrollContext.projectsSectionRef; break;
            case 'contact': scrollRef = scrollContext.contactSectionRef; break;
        }
    }

    const navAction = () => {
        if (isHomePage && scrollRef && scrollContext) {
            scrollContext.scrollToSection(scrollRef);
        }
    };

    return (
        <motion.div variants={linkVariants} whileHover="hover">
            {isHomePage ? (
                <button
                    onClick={() => handleNavigation(navAction)}
                    className="text-gray-200 hover:text-white font-medium relative group bg-transparent border-none cursor-pointer"
                >
                    {label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
            ) : (
                <Link
                    href={`/#${target}`}
                    className="text-gray-200 hover:text-white font-medium relative group"
                >
                    {label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
            )}
        </motion.div>
    );
  };

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const linkVariants = {
    hover: {
      color: "#3b82f6",
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-lg py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-semibold">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-blue-500">KSHITIJ </span>
              <span className="hidden md:inline">B.</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex space-x-8">
            {renderNavLink('Home', 'home')}
            {renderNavLink('About', 'about')}
            {renderNavLink('Projects', 'projects')}
            {renderNavLink('Contact', 'contact')}
            <motion.div variants={linkVariants} whileHover="hover">
              <Link
                href={"/resume"}
                className="text-gray-200 hover:text-white font-medium relative group bg-transparent border-none cursor-pointer"
              >
                Resume
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          </div>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <motion.div
        className="fixed top-0 right-0 h-screen w-full md:w-64 bg-gray-900/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center md:hidden"
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <div className="flex flex-col space-y-6 w-full px-12">
          <motion.div variants={navItemVariants}>
            {renderNavLink('Home', 'home')}
          </motion.div>
          <motion.div variants={navItemVariants}>
            {renderNavLink('About', 'about')}
          </motion.div>
          <motion.div variants={navItemVariants}>
            {renderNavLink('Projects', 'projects')}
          </motion.div>
          <motion.div variants={navItemVariants}>
            {renderNavLink('Contact', 'contact')}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
