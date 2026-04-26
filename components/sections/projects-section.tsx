"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import projectsData from "@/public/assets/data/projects_data.json";
import { ProjectData } from "@/types/project";

interface ClientProjectsSectionProps {
  projects?: ProjectData[];
}

const tagColors: Record<string, string> = {
  python: "#f59e0b",
  ai: "#10b981",
  langchain: "#10b981",
  fastapi: "#2dd4bf",
  redis: "#ef4444",
  kafka: "#a78bfa",
  spark: "#fb923c",
  aws: "#fb923c",
  airflow: "#38bdf8",
  grpc: "#60a5fa",
  docker: "#38bdf8",
  distributed: "#34d399",
};

const cardThemes = [
  "from-emerald-500/16 via-[var(--project-card-mid)] to-amber-500/10",
  "from-amber-500/16 via-[var(--project-card-mid)] to-emerald-500/10",
  "from-sky-500/14 via-[var(--project-card-mid)] to-emerald-500/10",
];

function getTagColor(tag: string): string {
  const lower = tag.toLowerCase();
  for (const key of Object.keys(tagColors)) {
    if (lower.includes(key)) return tagColors[key];
  }
  return "#a1a1aa";
}

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

export default function ClientProjectsSection({ projects = [] }: ClientProjectsSectionProps) {
  const [localProjects] = useState<ProjectData[]>(
    projects.length > 0 ? projects : (projectsData.projects as ProjectData[])
  );
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const displayedProjects = localProjects.slice(0, visibleProjects);

  return (
    <section className="min-h-[80vh] md:min-h-screen w-full flex flex-col justify-center px-4 py-10 md:py-10 relative">
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">03 / Projects</span>
          <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h2 className="font-black leading-[0.88] tracking-tight mb-2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            FEATURED
            <br />
            <span className="gradient-text">SYSTEMS.</span>
          </h2>
          <p className="text-[var(--text-tertiary)] text-sm max-w-xl leading-relaxed">
            Agentic AI orchestration, real-time ML data pipelines, and distributed systems work drawn from my current resume.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className={`group relative min-h-[300px] rounded-2xl cursor-pointer overflow-hidden border border-[var(--card-border)] bg-gradient-to-br ${cardThemes[index % cardThemes.length]} p-6 transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(16,185,129,0.06)]`}
              onClick={() => openModal(project)}
            >
              <div className="absolute right-4 top-3 font-mono text-7xl font-black text-white/[0.035] select-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative z-[1] flex h-full flex-col">
                <p className="mb-4 text-[10px] font-mono text-[var(--accent)] tracking-[0.25em] uppercase">
                  {project.tags.slice(0, 3).join(" / ")}
                </p>
                <h3 className="text-xl font-black leading-tight text-[var(--foreground)] mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-5 mb-5">
                  {project.description}
                </p>
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 5).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          color: getTagColor(tag),
                          background: `${getTagColor(tag)}18`,
                          border: `1px solid ${getTagColor(tag)}35`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex text-[11px] font-mono text-[var(--accent)]">
                    View Details -&gt;
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {visibleProjects < localProjects.length && (
          <div className="text-center mt-6">
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

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-glass relative rounded-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br ${cardThemes[localProjects.indexOf(selectedProject) % cardThemes.length]} p-6 md:p-8`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-[var(--accent)] tracking-[0.25em] uppercase mb-4">
                      {selectedProject.technologies}
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-black text-[var(--foreground)] leading-tight max-w-3xl">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button
                    className="shrink-0 w-9 h-9 flex items-center justify-center border border-[var(--card-border)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/50 transition-all bg-[var(--card-bg)] shadow-sm"
                    onClick={closeModal}
                    aria-label="Close project details"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <p className="text-[10px] font-mono text-[var(--accent)] mb-2 tracking-widest uppercase">Overview</p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-[var(--accent)] mb-2 tracking-widest uppercase">Technologies</p>
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
                  <p className="text-[10px] font-mono text-[var(--accent)] mb-2 tracking-widest uppercase">Key Features</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-tertiary)]">
                        <span className="text-[var(--green)] mt-0.5"><CheckIcon /></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-1">
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
