"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import projectsData from "@/public/assets/data/projects_data.json";
import { ProjectData } from "./ClientHomePage";
import {
  CardHoverReveal,
  CardHoverRevealMain,
  CardHoverRevealContent,
} from "@/components/ui/reveal-on-hover";

interface ClientProjectsSectionProps {
  projects?: ProjectData[];
}

/* ─── Tag colour mapping ─── */
const tagColors: Record<string, string> = {
  react:   "#2dd4bf",
  next:    "#2dd4bf",
  python:  "#f59e0b",
  ai:      "#10b981",
  nlp:     "#10b981",
  tensor:  "#10b981",
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
  const [localProjects] = useState<ProjectData[]>(
    projects.length > 0 ? projects : (projectsData.projects as ProjectData[])
  );
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(3);

  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

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
    <section className="py-28 px-4 relative w-full">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">03 / Projects</span>
          <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
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
          <p className="text-[var(--text-tertiary)] text-base max-w-xl leading-relaxed">
            A selection of projects in AI, cloud, and full-stack development —
            each designed to solve real problems with modern tools.
          </p>
        </motion.div>

        {/* Cards grid — hover-reveal style */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            >
              <CardHoverReveal
                className="h-[420px] rounded-2xl cursor-pointer border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(16,185,129,0.06)]"
                onClick={() => openModal(project)}
              >
                <CardHoverRevealMain>
                  <Image
                    src={project.image || "/api/placeholder/400/420"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="inline-block size-full max-h-full max-w-full object-cover align-middle"
                  />
                </CardHoverRevealMain>

                <CardHoverRevealContent className="space-y-3 rounded-2xl bg-zinc-900/75 text-zinc-50">
                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold leading-snug">{project.title}</h3>
                    <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono text-[var(--accent)] tracking-widest uppercase">Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 5).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{
                            color: getTagColor(tag),
                            background: `${getTagColor(tag)}20`,
                            border: `1px solid ${getTagColor(tag)}40`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--card-border)] text-[var(--text-tertiary)]">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[11px] font-mono text-[var(--accent)]">
                      View Details →
                    </span>
                    <div className="flex gap-2 ml-auto">
                      {project.githubLink && project.githubLink !== "#" && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors"
                        >
                          <GitHubIcon />
                        </a>
                      )}
                      {project.demoLink && project.demoLink !== "#" && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors"
                        >
                          <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </CardHoverRevealContent>
              </CardHoverReveal>
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
                  <p className="text-[var(--text-tertiary)] text-sm leading-relaxed whitespace-pre-line">{selectedProject.fullDescription}</p>
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
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-tertiary)]">
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
