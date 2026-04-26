'use client';

import { ProjectData } from '@/types/project';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo } from 'react';

interface ProjectListProps {
  projects: ProjectData[];
  activeFilter: string;
  searchQuery: string;
}

const cardThemes = [
  'from-emerald-500/14 via-[var(--project-card-mid)] to-amber-500/10',
  'from-amber-500/14 via-[var(--project-card-mid)] to-emerald-500/10',
  'from-sky-500/12 via-[var(--project-card-mid)] to-emerald-500/10',
];

export default function ProjectList({
  projects,
  activeFilter,
  searchQuery,
}: ProjectListProps) {
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchable = [
        project.title,
        project.description,
        project.technologies,
        ...project.tags,
      ].join(' ').toLowerCase();

      if (activeFilter !== 'all' && !searchable.includes(activeFilter.toLowerCase())) {
        return false;
      }

      if (searchQuery) {
        return searchable.includes(searchQuery.toLowerCase());
      }

      return true;
    });
  }, [projects, activeFilter, searchQuery]);

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          No projects found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project, index) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-gradient-to-br ${cardThemes[index % cardThemes.length]} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]`}
        >
          <div className="absolute right-4 top-4 font-mono text-6xl font-black text-white/[0.03] select-none">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="relative z-[1] flex h-full flex-col">
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--accent)]">
              {project.technologies}
            </p>
            <h2 className="mb-3 text-2xl font-black leading-tight text-[var(--foreground)]">
              {project.title}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.description}
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--card-border)] bg-black/10 px-3 py-1 text-[10px] font-mono text-[var(--text-tertiary)] transition-colors duration-300 group-hover:border-[var(--accent)]/30 group-hover:text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex justify-end">
              {project.githubLink && project.githubLink !== '#' && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs"
                >
                  GitHub
                </Link>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
