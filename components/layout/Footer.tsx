"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/KshitijBharambe",
      d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kshitijbharambe/",
      d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
  ];

  const links = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
    { label: "Resume", href: "/resume" },
  ];

  return (
    <footer className="relative" style={{ borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <Link href="/">
              <span className="font-mono font-bold text-xl text-[var(--accent)] tracking-widest">
                KB_
              </span>
            </Link>
            <p className="text-xs mt-1 font-mono" style={{ color: "var(--text-muted)" }}>
              Cloud Engineer · DevOps · AWS
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-mono hover:text-[var(--accent)] transition-colors tracking-wider uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all duration-300"
                style={{ border: "1px solid var(--card-border)", color: "var(--text-muted)" }}
                aria-label={s.label}
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="neon-line my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
            &copy; {year} Kshitij Bharambe
          </p>
          <p className="text-[11px] font-mono" style={{ color: "var(--text-tertiary)" }}>
            Next.js · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
