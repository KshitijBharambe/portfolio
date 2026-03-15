"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const skillCategories = [
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    num: "01",
    technologies: [
      { name: "AWS", icon: "amazonwebservices" },
      { name: "Docker", icon: "docker" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Git", icon: "git" },
      { name: "Linux", icon: "linux" },
    ],
    description:
      "Building scalable cloud infrastructure and efficient deployment pipelines.",
  },
  {
    id: "backend-api",
    title: "APIs & Backend",
    num: "02",
    technologies: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "REST APIs", icon: "restapi", customIcon: true },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
    ],
    description:
      "Developing robust, secure applications following best practices.",
  },
  {
    id: "frontend",
    title: "Frontend",
    num: "03",
    technologies: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "TypeScript", icon: "typescript" },
    ],
    description: "Creating responsive and intuitive user interfaces.",
  },
  {
    id: "security",
    title: "Security",
    num: "04",
    technologies: [
      { name: "Burp Suite", icon: "burpsuite", customIcon: true },
      { name: "Nessus", icon: "nessus", customIcon: true },
      { name: "Kali Linux", icon: "linux" },
    ],
    description:
      "Identifying and mitigating vulnerabilities across applications.",
  },
];

const education = [
  {
    degree: "M.S. Computational & Informational Sciences",
    period: "Aug 2023 – May 2025",
    institution: "Syracuse University",
    coursework:
      "Data Mining · AI · OS · DBMS · Algorithms · IoT Security · NLP",
  },
  {
    degree: "B.E. Computer Engineering",
    period: "Aug 2019 – May 2023",
    institution: "New Horizon Institute of Technology & Management",
    coursework: "Software Engineering · Security · Computer Architecture",
  },
];

const experience = [
  {
    position: "Vulnerability & Penetration Testing Intern",
    company: "Sequretek Pvt. Ltd.",
    companyUrl: "https://sequretek.com",
    period: "Jun 2024 – Aug 2024",
    responsibilities: [
      "Conducted vulnerability assessments across 15+ apps using Burp Suite & Kali Linux.",
      "Identified 20+ vulnerabilities (XSS, SQLi, misconfigurations) with mitigation steps.",
      "Supported ISO 27001-aligned infrastructure audits.",
      "Collaborated to improve backend and network security posture.",
    ],
  },
  {
    position: "Software Engineer Intern",
    company: "CBRAINTECH LLP",
    companyUrl: "",
    period: "Jun 2022 – May 2023",
    responsibilities: [
      "Contributed to backend dev with Python & FastAPI; integrated 10+ secure REST APIs.",
      "Automated CI workflows via GitHub Actions for streamlined deployment.",
      "Assisted in AWS provisioning (EC2, S3, Lambda, IAM) to reduce costs.",
      "PostgreSQL query tuning — improved performance ~30% on data-heavy endpoints.",
      "Sprint planning, code reviews, and API documentation for team onboarding.",
    ],
  },
];

const tabs = [
  { id: "skills", label: "Skills", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "education", label: "Education", num: "03" },
];

const SkillsTabsSection = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [activeSkillCategory, setActiveSkillCategory] = useState("cloud-devops");

  const activeCategory =
    skillCategories.find((c) => c.id === activeSkillCategory) ||
    skillCategories[0];

  const renderCustomIcon = (tech: { name: string; icon: string }) => {
    if (tech.icon === "restapi") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      );
    }
    if (tech.icon === "nessus") {
      return (
        <Image
          src="/assets/Tenable SVG Icon.svg"
          alt="Tenable Nessus"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      );
    }
    if (tech.icon === "burpsuite") {
      return (
        <Image
          src="/assets/burpsuite.png"
          alt="Burp Suite"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      );
    }
    return <span className="text-xs text-center font-mono">{tech.name}</span>;
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    icon: string,
    name: string
  ) => {
    const target = e.currentTarget;
    target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-plain.svg`;
    target.onerror = () => {
      target.style.display = "none";
      const parent = target.parentElement;
      if (parent) {
        const span = document.createElement("span");
        span.className = "text-[10px] font-mono text-[var(--accent)]";
        span.textContent = name
          .split(" ")
          .map((w) => w[0])
          .join("");
        parent.appendChild(span);
      }
    };
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Glass pill tab navigation */}
      <div className="glass rounded-xl p-1 flex items-center gap-1 mb-8 w-fit">
        {tabs.map(({ id, label, num }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg ${
              activeTab === id
                ? "bg-[var(--accent)]/10 text-white border border-[var(--accent)]/30"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            <span
              className={`font-mono text-[10px] ${
                activeTab === id ? "text-[var(--accent)]" : "text-gray-600"
              }`}
            >
              {num}
            </span>
            {label}
            {activeTab === id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── SKILLS TAB ── */}
        {activeTab === "skills" && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg border transition-all duration-300 ${
                    activeSkillCategory === cat.id
                      ? "border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/8"
                      : "border-white/8 text-gray-400 hover:border-white/15 hover:text-gray-200 bg-white/[0.02]"
                  }`}
                >
                  <span className="text-[9px] opacity-60">{cat.num}</span>
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Spotlight card with category info + tech grid */}
            <div className="spotlight-card glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <div className="flex flex-col md:flex-row gap-8">
                {/* Category info */}
                <div className="md:w-1/3">
                  <h4 className="text-lg font-bold text-white mb-2">
                    {activeCategory.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {activeCategory.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)]/40 to-transparent" />
                    <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">
                      {activeCategory.technologies.length} tools
                    </span>
                  </div>
                </div>

                {/* Tech grid */}
                <div className="md:w-2/3">
                  <p className="text-xs font-mono text-gray-600 tracking-widest uppercase mb-5">
                    Technologies &amp; Tools
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {activeCategory.technologies.map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-white/6 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all duration-300 cursor-default backdrop-blur-sm"
                      >
                        <div className="w-8 h-8 flex items-center justify-center text-[var(--accent)]">
                          {tech.customIcon ? (
                            renderCustomIcon(tech)
                          ) : (
                            <Image
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                              alt={tech.name}
                              width={32}
                              height={32}
                              className="filter grayscale group-hover:grayscale-0 transition-all duration-300"
                              onError={(e) =>
                                handleImageError(e, tech.icon, tech.name)
                              }
                            />
                          )}
                        </div>
                        <span className="text-[11px] text-center text-gray-400 group-hover:text-gray-200 font-mono">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── EXPERIENCE TAB ── */}
        {activeTab === "experience" && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="spotlight-card glass glass-hover rounded-2xl p-6 relative overflow-hidden group"
              >
                {/* Left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)]/40 to-transparent" />

                {/* Watermark number */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-8xl text-white/[0.025] select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {item.position}
                    </h4>
                    <a
                      href={item.companyUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] text-sm font-mono hover:underline"
                    >
                      {item.company}
                    </a>
                  </div>
                  <span className="font-mono text-[11px] text-gray-500 border border-white/10 px-3 py-1 rounded-lg bg-white/[0.02]">
                    {item.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {item.responsibilities.map((r, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-gray-400"
                    >
                      <span className="text-[var(--accent)] mt-1 flex-shrink-0">
                        ›
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── EDUCATION TAB ── */}
        {activeTab === "education" && (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {education.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="spotlight-card glass glass-shimmer rounded-2xl p-6 relative overflow-hidden"
              >
                {/* Watermark number */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-8xl text-white/[0.025] select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-2)]/30 to-transparent" />

                <div className="flex flex-wrap justify-between items-start gap-3 mb-2">
                  <h4 className="text-base font-bold text-white max-w-lg">
                    {item.degree}
                  </h4>
                  <span className="font-mono text-[11px] text-gray-500 border border-white/10 px-3 py-1 rounded-lg bg-white/[0.02]">
                    {item.period}
                  </span>
                </div>
                <p className="text-[var(--accent)] text-sm font-mono mb-3">
                  {item.institution}
                </p>
                <p className="text-xs text-gray-500">{item.coursework}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsTabsSection;
