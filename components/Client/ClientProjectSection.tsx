"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import projectsData from "@/public/assets/data/projects_data.json";
import { ProjectData } from "./ClientHomePage";

interface ClientProjectsSectionProps {
  projects?: ProjectData[];
}

/* ─── Tag colour mapping ─── */
const tagColors: Record<string, string> = {
  react:   "#818cf8",
  next:    "#818cf8",
  python:  "#fbbf24",
  ai:      "#a78bfa",
  nlp:     "#a78bfa",
  tensor:  "#a78bfa",
  data:    "#34d399",
  elastic: "#34d399",
  pandas:  "#34d399",
  docker:  "#fb923c",
  aws:     "#fb923c",
  devops:  "#fb923c",
  node:    "#4ade80",
};

function getTagColor(tag: string): string {
  const lower = tag.toLowerCase();
  for (const key of Object.keys(tagColors)) {
    if (lower.includes(key)) return tagColors[key];
  }
  return "#52525b";
}

/* ─── Icons ─── */
const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

/* ─── Component ─── */
export default function ClientProjectsSection({ projects = [] }: ClientProjectsSectionProps) {
  // FIX: Initialize with data immediately (not in useEffect) so stagger animation works
  const [localProjects] = useState<ProjectData[]>(
    projects.length > 0 ? projects : (projectsData.projects as ProjectData[])
  );
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(3);

  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  /* Spotlight mouse handler */
  const handleSpotlightMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  /* Modal helpers */
  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const displayedProjects = localProjects.slice(0, visibleProjects);

  return (
    <section className="text-white py-28 px-4 relative w-full">
      {/* Atmospheric orbs */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 left-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">03 / Projects</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="font-black leading-[0.88] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}>
            FEATURED
            <br />
            <span className="gradient-text">WORK.</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            A selection of projects in AI, cloud, and full-stack development —
            each designed to solve real problems with modern tools.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="spotlight-card group rounded-2xl flex flex-col cursor-pointer"
              style={{ willChange: "transform" }}
              onMouseMove={handleSpotlightMove}
              onClick={() => openModal(project)}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            >
              {/* Watermark */}
              <span className="absolute top-3 right-4 font-black text-6xl text-white/[0.035] select-none pointer-events-none z-[1]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Image */}
              <div className="relative h-44 rounded-t-2xl overflow-hidden bg-[var(--surface)]">
                <Image
                  src={project.image || "/api/placeholder/400/200"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-[1] p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-white/90 mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-white/35 mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{
                        color: getTagColor(tag),
                        background: `${getTagColor(tag)}14`,
                        border: `1px solid ${getTagColor(tag)}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/25">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details →
                  </span>
                  <div className="flex gap-3">
                    {project.githubLink && project.githubLink !== "#" && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-white/20 hover:text-white/70 transition-colors"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show more */}
        {visibleProjects < localProjects.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleProjects(localProjects.length)}
              className="btn-outline mx-auto"
            >
              Show More Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ═══ Modal ═══ */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="glass rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto relative"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image header */}
              <div className="relative h-56 sm:h-72 rounded-t-2xl overflow-hidden bg-black">
                <Image
                  src={selectedProject.image || "/api/placeholder/800/400"}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-black/30 to-transparent" />
                <button
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/15 rounded-lg text-white/50 hover:text-white hover:border-[var(--accent)]/50 transition-all backdrop-blur-sm bg-black/30"
                  onClick={closeModal}
                >
                  <CloseIcon />
                </button>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedProject.title}</h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-[10px] font-mono text-[var(--accent)] mb-2 tracking-widest uppercase">Overview</p>
                  <p className="text-white/40 text-sm leading-relaxed whitespace-pre-line">{selectedProject.fullDescription}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--accent)] mb-3 tracking-widest uppercase">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{ color: getTagColor(tag), background: `${getTagColor(tag)}14`, border: `1px solid ${getTagColor(tag)}30` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--accent)] mb-3 tracking-widest uppercase">Key Features</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                        <span className="text-[var(--green)] mt-0.5"><CheckIcon /></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 pt-2">
                  {selectedProject.demoLink && selectedProject.demoLink !== "#" && (
                    <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
                      Live Demo <ExternalLinkIcon />
                    </a>
                  )}
                  {selectedProject.githubLink && selectedProject.githubLink !== "#" && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs">
                      Source Code <GitHubIcon />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
