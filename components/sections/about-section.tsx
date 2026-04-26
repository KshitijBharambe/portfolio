"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

/* ── Data ── */
const skillCategories = [
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    technologies: [
      { name: "AWS", icon: "amazonwebservices" },
      { name: "GCP", icon: "googlecloud" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Terraform", icon: "terraform" },
      { name: "Docker", icon: "docker" },
      { name: "GitHub Actions", icon: "githubactions" },
    ],
  },
  {
    id: "backend-api",
    title: "Backend & APIs",
    technologies: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Django", icon: "django" },
      { name: "Node.js", icon: "nodejs" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    technologies: [
      { name: "LangChain", icon: "chain", customIcon: true },
      { name: "MCP", icon: "mcp", customIcon: true },
      { name: "SageMaker", icon: "sagemaker", customIcon: true },
      { name: "Spark", icon: "apachespark" },
    ],
  },
  {
    id: "data-observability",
    title: "Data & Observability",
    technologies: [
      { name: "Kafka", icon: "apachekafka" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
      { name: "Jaeger", icon: "jaeger", customIcon: true },
    ],
  },
];

const experience = [
  { position: "Software Engineer II, QuickBooks Platform", company: "Intuit", period: "Jan 2025 - Present", location: "Mountain View, CA" },
  { position: "Software Engineer II", company: "Razorpay", period: "Oct 2021 - Jul 2023", location: "Bengaluru, India" },
  { position: "Associate Developer", company: "Razorpay", period: "Feb 2021 - Sep 2021", location: "Bengaluru, India" },
];

const education = [
  { degree: "M.S. Computer Science", institution: "Syracuse University", period: "2023 - 2025" },
  { degree: "B.E. Computer Engineering", institution: "New Horizon Institute of Technology and Management", period: "2019 - 2023" },
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

const iconSlugs: Record<string, string> = {
  googlecloud: "googlecloud",
  kubernetes: "kubernetes",
  terraform: "terraform",
  docker: "docker",
  githubactions: "githubactions",
  python: "python",
  fastapi: "fastapi",
  django: "django",
  nodejs: "nodedotjs",
  graphql: "graphql",
  apachespark: "apachespark",
  apachekafka: "apachekafka",
  postgresql: "postgresql",
  redis: "redis",
  prometheus: "prometheus",
  grafana: "grafana",
};

const customSkillIcon = (icon: string) => {
  if (icon === "amazonwebservices") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 17.5h11a4 4 0 0 0 .7-7.94A6 6 0 0 0 6.35 8.2 4.75 4.75 0 0 0 6 17.5Z" />
        <path d="M8 13h8M10.5 10.5 8 13l2.5 2.5M13.5 10.5 16 13l-2.5 2.5" />
      </svg>
    );
  }

  if (icon === "chain") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.5 7.5 9 6a4.25 4.25 0 0 0-6 6l2.5 2.5a4.25 4.25 0 0 0 6 0" />
        <path d="m13.5 16.5 1.5 1.5a4.25 4.25 0 0 0 6-6l-2.5-2.5a4.25 4.25 0 0 0-6 0" />
        <path d="m8.5 15.5 7-7" />
      </svg>
    );
  }

  if (icon === "mcp") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 17V7l8-4 8 4v10l-8 4-8-4Z" />
        <path d="M8 9v6M12 8v8M16 9v6" />
      </svg>
    );
  }

  if (icon === "sagemaker") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 18V6l8-3 8 3v12l-8 3-8-3Z" />
        <path d="M8 14c1.5-3 3.5-4.5 8-4" />
        <path d="M8 10h.01M12 14h.01M16 10h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "jaeger") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="7" r="2.5" />
        <circle cx="18" cy="17" r="2.5" />
        <path d="M8.2 10.8 15.8 8.2M8.2 13.2l7.6 2.6" />
      </svg>
    );
  }

  return null;
};

/* ── Component ── */
const AboutSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [activeTab, setActiveTab] = useState("skills");
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const category = skillCategories.find((c) => c.id === activeCategory) || skillCategories[0];

  return (
    <section ref={ref} className="min-h-screen md:h-screen w-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-14 py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">

        {/* ── Top row: profile + bio ── */}
        <div className="flex items-start gap-8 mb-8">
          {/* Profile photo */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex-shrink-0 hidden md:block">
            <div className="relative">
              <div
                className={`absolute inset-[-2px] rounded-full ${inView ? "animate-spin-slow" : ""}`}
                style={{ background: "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))" }}
              />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--bg)]">
                <Image src="/assets/profile-pic.jpeg" alt="Kshitij Pritish Bharambe" fill sizes="6rem" className="object-cover object-center" priority />
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
              I BUILD <span className="gradient-text">SYSTEMS.</span>
            </motion.h2>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
              Backend-focused Software Engineer specializing in Python services, event-driven architecture, AI integrations, and cloud-native platforms.
              I build systems that reduce latency, improve reliability, and make production behavior easier to observe and operate.
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
                className={`px-4 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all duration-300 ${
                  activeTab === id
                    ? "border-[var(--accent)] text-[var(--accent)] bg-transparent shadow-[inset_0_-2px_0_var(--accent)]"
                    : "border-[var(--card-border)] text-[var(--text-secondary)] bg-transparent hover:border-[var(--accent)]/35 hover:text-[var(--foreground)]"
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
                    className={`px-3 py-1 text-[11px] font-mono font-semibold rounded-md border transition-all duration-200 ${
                      activeCategory === cat.id
                        ? "border-[var(--accent)] text-[var(--accent)] bg-transparent shadow-[inset_0_-2px_0_var(--accent)]"
                        : "border-[var(--card-border)] text-[var(--text-secondary)] bg-transparent hover:border-[var(--accent)]/35 hover:text-[var(--foreground)]"
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
                    className="group flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-[var(--card-border)] bg-transparent hover:border-[var(--accent)]/40 transition-all duration-200 cursor-default"
                  >
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-[#047857]/55 bg-transparent text-[#047857]">
                      {iconSlugs[tech.icon] ? (
                        <Image
                          src={`https://cdn.simpleicons.org/${iconSlugs[tech.icon]}/047857`}
                          alt=""
                          width={16}
                          height={16}
                          unoptimized
                          className="h-4 w-4 opacity-100 transition-opacity duration-200"
                        />
                      ) : (
                        customSkillIcon(tech.icon)
                      )}
                    </div>
                    <span className="text-[11px] text-center text-[var(--text-secondary)] group-hover:text-[var(--foreground)] font-mono font-medium leading-tight">
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
