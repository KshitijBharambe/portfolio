'use client';

import { ProjectData } from '@/types/project';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

interface ProjectListProps {
  projects: ProjectData[];
  activeFilter: string;
  searchQuery: string;
}

export default function ProjectList({ 
  projects, 
  activeFilter, 
  searchQuery 
}: ProjectListProps) {
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter !== 'all' && !project.tags.includes(activeFilter)) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [projects, activeFilter, searchQuery]);

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No projects found matching your criteria.
        </p>
      </div>
    );
  }

    return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-white/20 dark:bg-black/20"
        >
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white font-sans">{project.title}</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 font-sans">
              {project.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500 transition-colors duration-300 group-hover:bg-blue-500/20 dark:text-blue-400 font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex-grow"></div>
            <div className="mt-auto flex justify-end">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 group-hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Github
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
