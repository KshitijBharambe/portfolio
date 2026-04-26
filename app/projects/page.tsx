'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import projectsData from '@/public/assets/data/projects_data.json';
import { ProjectData } from '@/types/project';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]" />
  </div>
);

const ProjectList = dynamic(
  () => import('@/components/project-list'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const PROJECT_CATEGORIES = [
  'all',
  'python',
  'ai',
  'distributed systems',
  'cloud',
  'data',
] as const;

type ProjectCategory = typeof PROJECT_CATEGORIES[number];

export default function ProjectsPage() {
  const [projects] = useState<ProjectData[]>(projectsData.projects as ProjectData[]);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen px-4 pt-28 pb-20" style={{ background: 'var(--bg)', color: 'var(--foreground)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">
              Projects
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--divider)' }} />
          </div>

          <motion.h1
            className="font-black leading-[0.9] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PROJECT
            <br />
            <span className="gradient-text">SYSTEMS.</span>
          </motion.h1>
          <motion.p
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Resume-aligned projects across agentic AI, real-time ML pipelines, and distributed systems correctness.
          </motion.p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                className="input-surface"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap border transition-all duration-300 ${
                    activeFilter === category
                      ? 'border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/10'
                      : 'border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--accent)]/30'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <ProjectList
            projects={projects}
            activeFilter={activeFilter}
            searchQuery={searchQuery}
          />
        </Suspense>
      </div>
    </div>
  );
}
