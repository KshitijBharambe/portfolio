"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "3+",  label: "Years Exp",      color: "var(--accent)" },
  { value: "40%", label: "Faster Deploys", color: "var(--accent-2)" },
  { value: "30%", label: "Cost Saved",     color: "var(--accent)" },
  { value: "AWS", label: "Certified",      color: "var(--accent-2)" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const AboutHeader = () => {
  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* ── Section number watermark ── */}
      <div className="absolute right-0 top-0 font-black text-[160px] leading-none text-white/[0.015] select-none pointer-events-none hidden lg:block" style={{ letterSpacing: "-0.05em" }}>
        02
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        {/* ── LEFT: Profile column ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6"
        >
          {/* Profile photo with gradient ring */}
          <div className="relative">
            <div
              className="absolute inset-[-3px] rounded-full animate-spin-slow"
              style={{
                background: "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))",
              }}
            />
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-[var(--bg)]">
              <Image
                src="/assets/profile-pic.jpeg"
                alt="Kshitij Bharambe"
                fill
                sizes="10rem"
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Available dot */}
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[var(--bg)] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)]" />
            </div>
          </div>

          {/* Name + role */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white tracking-tight">Kshitij Bharambe</h3>
            <p className="text-sm font-mono text-[var(--accent)] mt-1 tracking-wider">
              Cloud Engineer &middot; DevOps &middot; AWS
            </p>
          </div>

          {/* Available badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--green)]" />
            </span>
            <span className="text-[10px] font-mono text-[var(--green)] tracking-[0.15em] uppercase">
              Available for hire
            </span>
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              {
                href: "https://github.com/KshitijBharambe",
                label: "GitHub",
                d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
              },
              {
                href: "https://www.linkedin.com/in/kshitijbharambe/",
                label: "LinkedIn",
                d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center border border-white/[0.08] hover:border-[var(--accent)]/40 text-white/30 hover:text-[var(--accent)] transition-all duration-300 rounded-xl bg-white/[0.02]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2 w-full mt-2">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
              >
                <div
                  className="text-lg font-black mb-0.5"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-[9px] font-mono text-white/30 tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Bio content ── */}
        <div className="lg:col-span-3 space-y-8">
          {/* Section label */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">02 / About</span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-black leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            I BUILD
            <br />
            <span className="gradient-text">THINGS.</span>
          </motion.h2>

          {/* Bio */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <p className="text-white/50 text-base leading-relaxed">
              Cloud-native Infrastructure Engineer with a Master&apos;s in Computer
              Science and deep expertise in AWS, Terraform, and DevSecOps. Proven
              track record of architecting resilient CI/CD pipelines, optimizing
              backend performance using FastAPI, and enforcing cost governance.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              Currently deploying Percept EDR across multi-tenant Azure environments
              at Sequretek. Previously provisioned scalable AWS infrastructure via
              Terraform, engineered automated workflows in GitHub Actions, and
              optimized high-traffic REST APIs with FastAPI and PostgreSQL.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              AWS Certified Solutions Architect &middot; ISO 27001 Lead Auditor.
              Specialist in infrastructure automation, container orchestration, and
              eliminating configuration drift for scalable systems.
            </p>
          </motion.div>

          {/* Quick skill tags */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
          >
            {["AWS", "Terraform", "Docker", "GitHub Actions", "Python", "FastAPI", "PostgreSQL", "Ansible", "Grafana", "CI/CD"].map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-mono px-3 py-1 rounded-lg border border-white/[0.07] text-white/40 bg-white/[0.02] hover:border-[var(--accent)]/30 hover:text-[var(--accent)]/80 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
