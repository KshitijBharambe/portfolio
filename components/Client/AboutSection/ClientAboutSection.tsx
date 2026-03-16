"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ── Data ── */
const skillCategories = [
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    technologies: [
      { name: "AWS", icon: "amazonwebservices" },
      { name: "Terraform", icon: "terraform" },
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux" },
      { name: "GitHub Actions", icon: "githubactions" },
    ],
  },
  {
    id: "infra-automation",
    title: "Infra & Automation",
    technologies: [
      { name: "Ansible", icon: "ansible" },
      { name: "Bash", icon: "bash" },
      { name: "PowerShell", icon: "powershell" },
    ],
  },
  {
    id: "backend-api",
    title: "Backend & Databases",
    technologies: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    id: "monitoring",
    title: "Observability",
    technologies: [
      { name: "CloudWatch", icon: "cloudwatch", customIcon: true },
      { name: "Grafana", icon: "grafana" },
    ],
  },
];

const experience = [
  { position: "Cloud Deployment Engineer", company: "Sequretek", period: "Feb 2026 – Present" },
  { position: "DevOps Intern", company: "Sequretek", period: "Jun – Aug 2024" },
  { position: "Software & Cloud Engineer", company: "Cognologix", period: "Jun 2022 – May 2023" },
];

const education = [
  { degree: "M.S. Computer Science", institution: "Syracuse University", period: "2023 – 2025" },
  { degree: "B.E. Computer Engineering", institution: "University of Mumbai", period: "2019 – 2023" },
];

const tabs = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Icon helpers ── */
const getIconSrc = (icon: string, failed: Record<string, string>) => {
  if (failed[icon] === "retry")
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-plain.svg`;
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;
};

const renderCustomIcon = (icon: string) => {
  if (icon === "cloudwatch")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    );
  return null;
};

/* ── Component ── */
const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [failedIcons, setFailedIcons] = useState<Record<string, string>>({});

  const handleImageError = useCallback((icon: string) => {
    setFailedIcons((prev) => {
      if (!prev[icon]) return { ...prev, [icon]: "retry" };
      if (prev[icon] === "retry") return { ...prev, [icon]: "failed" };
      return prev;
    });
  }, []);

  const category = skillCategories.find((c) => c.id === activeCategory) || skillCategories[0];

  return (
    <section className="h-screen w-full flex flex-col justify-center px-6 md:px-10 lg:px-14 py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">

        {/* ── Top row: profile + bio ── */}
        <div className="flex items-start gap-8 mb-8">
          {/* Profile photo */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex-shrink-0 hidden md:block">
            <div className="relative">
              <div
                className="absolute inset-[-2px] rounded-full animate-spin-slow"
                style={{ background: "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))" }}
              />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--bg)]">
                <Image src="/assets/profile-pic.jpeg" alt="Kshitij Bharambe" fill sizes="6rem" className="object-cover object-center" priority />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[var(--bg)] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--green)] shadow-[0_0_6px_var(--green)]" />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <div className="flex-1 min-w-0">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">02 / About</span>
              <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-black leading-[0.9] tracking-tight mb-3"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              I BUILD <span className="gradient-text">THINGS.</span>
            </motion.h2>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
              Cloud-native Infrastructure Engineer with a Master&apos;s in CS, specializing in AWS, Terraform, and DevSecOps.
              Building resilient multi-tenant security infrastructure &mdash; CI/CD pipelines, cloud automation, and high-traffic APIs at scale.
            </motion.p>
          </div>

          {/* More about me link */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex-shrink-0 hidden lg:block self-end">
            <Link href="/about" className="btn-outline text-xs inline-flex items-center gap-1.5">
              More
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Tab navigation ── */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-center gap-1 mb-4">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 ${
                  activeTab === id
                    ? "border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/8"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          {/* Skills */}
          {activeTab === "skills" && (
            <motion.div key="skills" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 text-[11px] font-mono rounded-md border transition-all duration-200 ${
                      activeCategory === cat.id
                        ? "border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/8"
                        : "border-white/8 text-[var(--text-tertiary)] hover:border-white/15 bg-white/[0.02]"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Tech grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
                {category.technologies.map((tech, i) => (
                  <motion.div
                    key={`${category.id}-${tech.name}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="group flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/[0.06] hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all duration-200 cursor-default"
                  >
                    <div className="w-7 h-7 flex items-center justify-center text-[var(--accent)]">
                      {(tech as { customIcon?: boolean }).customIcon ? (
                        renderCustomIcon(tech.icon)
                      ) : failedIcons[tech.icon] === "failed" ? (
                        <span className="text-[9px] font-mono text-[var(--accent)]">{tech.name.split(" ").map((w) => w[0]).join("")}</span>
                      ) : (
                        <Image
                          src={getIconSrc(tech.icon, failedIcons)}
                          alt={tech.name}
                          width={28}
                          height={28}
                          className="filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          onError={() => handleImageError(tech.icon)}
                        />
                      )}
                    </div>
                    <span className="text-[10px] text-center text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] font-mono leading-tight">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Experience */}
          {activeTab === "experience" && (
            <motion.div key="experience" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-2">
              {experience.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-[var(--accent)]/20 transition-all duration-200">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)]" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[var(--foreground)]">{item.position}</h4>
                      <p className="text-xs font-mono text-[var(--accent)]">{item.company}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] whitespace-nowrap">{item.period}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Education */}
          {activeTab === "education" && (
            <motion.div key="education" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-2">
              {education.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-[var(--accent-2)]/20 transition-all duration-200">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[var(--accent-2)] to-[var(--accent)]" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[var(--foreground)]">{item.degree}</h4>
                      <p className="text-xs font-mono text-[var(--accent)]">{item.institution}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] whitespace-nowrap">{item.period}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutSection;
