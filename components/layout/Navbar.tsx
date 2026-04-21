"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, SECTIONS } from "@/context/ScrollContext";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { label: "Home", num: "01", target: "home" },
  { label: "About", num: "02", target: "about" },
  { label: "Projects", num: "03", target: "projects" },
  { label: "Contact", num: "04", target: "contact" },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const scrollContext = useScroll();
  const { theme, toggleTheme } = useTheme();

  const activeItem = scrollContext ? SECTIONS[scrollContext.activeSection] : "home";

  const handleNav = (target: string) => {
    setMobileOpen(false);
    const isHome = pathname === "/";
    if (isHome) {
      // Dispatch event so both mobile (scrollIntoView) and desktop (section swap) can handle it
      window.dispatchEvent(new CustomEvent("navigate-section", { detail: target }));
    }
  };

  const isHome = pathname === "/";

  return (
    <>
      {/* Floating pill navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: isHome ? 3.5 : 0.1 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div
          className="glass-nav rounded-full px-4 md:px-6 py-2.5 flex items-center gap-4 md:gap-6 transition-all duration-500"
          style={{
            background: "var(--nav-bg)",
            backdropFilter: "blur(20px) saturate(130%)",
            WebkitBackdropFilter: "blur(20px) saturate(130%)",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* Logo */}
          <Link href="/" onClick={() => handleNav("home")}>
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
                        isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {num}.
                    </span>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-[var(--foreground)]" : "text-[var(--text-tertiary)] hover:text-[var(--foreground)]"
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
                  onClick={() => handleNav(target)}
                  className="no-underline"
                >
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            className="hidden md:flex w-8 h-8 items-center justify-center rounded-full border border-white/[0.08] hover:border-[var(--accent)]/40 transition-all duration-300 bg-transparent cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.button>

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
                  `radial-gradient(ellipse at 50% 0%, rgba(129,140,248,0.04) 0%, transparent 60%), color-mix(in srgb, var(--bg) 95%, transparent)`,
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
                          isActive ? "text-[var(--accent)]" : "text-[var(--foreground)]"
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
                        handleNav(target);
                        setMobileOpen(false);
                      }}
                      className="no-underline"
                    >
                      {itemContent}
                    </Link>
                  );
                })}

                {/* Resume + Theme toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.06 + 0.1 }}
                  className="flex items-center gap-4"
                >
                  <Link
                    href="/resume"
                    onClick={() => setMobileOpen(false)}
                    className="btn-neon inline-flex text-sm py-2.5 px-8 rounded-full"
                  >
                    Resume
                  </Link>
                  <button
                    onClick={toggleTheme}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-transparent cursor-pointer"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    )}
                  </button>
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
