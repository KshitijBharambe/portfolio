"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "@/context/ScrollContext";

const navItems = [
  { label: "Home", num: "01", target: "home" },
  { label: "About", num: "02", target: "about" },
  { label: "Projects", num: "03", target: "projects" },
  { label: "Contact", num: "04", target: "contact" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const pathname = usePathname();
  const scrollContext = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const getRef = (target: string) => {
    if (!scrollContext) return null;
    switch (target) {
      case "home":
        return scrollContext.homeSectionRef;
      case "about":
        return scrollContext.aboutSectionRef;
      case "projects":
        return scrollContext.projectsSectionRef;
      case "contact":
        return scrollContext.contactSectionRef;
      default:
        return null;
    }
  };

  const handleNav = (target: string) => {
    setActiveItem(target);
    setMobileOpen(false);
    const isHome = pathname === "/";
    if (isHome && scrollContext) {
      const ref = getRef(target);
      if (ref) scrollContext.scrollToSection(ref);
    }
  };

  const isHome = pathname === "/";

  return (
    <>
      {/* Floating pill navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div
          className={`glass-nav rounded-full px-4 md:px-6 py-2.5 flex items-center gap-4 md:gap-6 transition-all duration-500 border border-white/[0.06] ${
            scrolled
              ? "bg-black/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              : "bg-black/30 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          }`}
        >
          {/* Logo */}
          <Link href="/" onClick={() => setActiveItem("home")}>
            <motion.span
              className="font-mono font-bold text-lg tracking-widest text-[var(--accent)] select-none whitespace-nowrap"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              KB_
            </motion.span>
          </Link>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, num, target }) => {
              const isActive = activeItem === target;

              const inner = (
                <motion.div
                  className="relative px-3 py-1.5 rounded-full cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {/* Active background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <span
                      className={`font-mono text-[10px] transition-colors duration-300 ${
                        isActive ? "text-[var(--accent)]" : "text-gray-500"
                      }`}
                    >
                      {num}.
                    </span>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {label}
                    </span>
                  </span>
                </motion.div>
              );

              if (isHome) {
                return (
                  <button
                    key={target}
                    onClick={() => handleNav(target)}
                    className="bg-transparent border-none cursor-pointer p-0"
                  >
                    {inner}
                  </button>
                );
              }

              return (
                <Link
                  key={target}
                  href={`/#${target}`}
                  onClick={() => setActiveItem(target)}
                  className="no-underline"
                >
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Resume button */}
          <Link href="/resume" className="hidden md:block">
            <motion.span
              className="btn-neon text-[11px] py-1.5 px-4 rounded-full whitespace-nowrap"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Resume
            </motion.span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 bg-transparent border-none cursor-pointer p-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 5, width: 18 }
                  : { rotate: 0, y: 0, width: 18 }
              }
              className="block h-[1.5px] bg-[var(--accent)] rounded-full"
              style={{ width: 18 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 12 }}
              className="block h-[1.5px] bg-gray-400 rounded-full"
              style={{ width: 12 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -5, width: 18 }
                  : { rotate: 0, y: 0, width: 18 }
              }
              className="block h-[1.5px] bg-[var(--accent)] rounded-full"
              style={{ width: 18 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/70 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(129,140,248,0.04) 0%, transparent 60%), rgba(10,10,14,0.95)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            >
              {/* Close button */}
              <button
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-transparent border border-white/10 rounded-full cursor-pointer"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Nav items */}
              <nav className="flex flex-col items-center gap-8">
                {navItems.map(({ label, num, target }, i) => {
                  const isActive = activeItem === target;

                  const itemContent = (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 + 0.1, type: "spring", stiffness: 300, damping: 25 }}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <span className="font-mono text-[11px] text-[var(--accent)] opacity-70">
                        {num}.
                      </span>
                      <span
                        className={`text-2xl font-bold transition-colors duration-300 ${
                          isActive ? "text-[var(--accent)]" : "text-white"
                        }`}
                      >
                        {label}
                      </span>
                    </motion.div>
                  );

                  if (isHome) {
                    return (
                      <button
                        key={target}
                        onClick={() => handleNav(target)}
                        className="bg-transparent border-none cursor-pointer p-0"
                      >
                        {itemContent}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={target}
                      href={`/#${target}`}
                      onClick={() => {
                        setActiveItem(target);
                        setMobileOpen(false);
                      }}
                      className="no-underline"
                    >
                      {itemContent}
                    </Link>
                  );
                })}

                {/* Resume button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.06 + 0.1 }}
                >
                  <Link
                    href="/resume"
                    onClick={() => setMobileOpen(false)}
                    className="btn-neon inline-flex text-sm py-2.5 px-8 rounded-full"
                  >
                    Resume
                  </Link>
                </motion.div>
              </nav>

              {/* Decorative bottom line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
