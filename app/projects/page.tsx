'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ProjectData } from '@/types/project';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Dynamically import the ProjectList component with no SSR
const ProjectList = dynamic(
  () => import('@/components/project-list'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

// Sample project data (replace with your actual data fetching logic)
const sampleProjects: ProjectData[] = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A sample project description',
    image: '/images/project1.jpg',
    tags: ['web', 'frontend'],
    features: ['Feature 1', 'Feature 2'],
    technologies: 'React, Next.js, TypeScript',
    githubLink: 'https://github.com/yourusername/project1',
    demoLink: 'https://project1-demo.com',
    fullDescription: 'Full project description here...'
  },
  // Add more sample projects as needed
];

// Available project categories
const PROJECT_CATEGORIES = [
  'all',
  'web',
  'mobile',
  'design',
  'full-stack',
  'frontend',
  'backend',
] as const;

type ProjectCategory = typeof PROJECT_CATEGORIES[number];

export default function ProjectsPage() {
  const [projects] = useState<ProjectData[]>(sampleProjects);
  const [isLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Here are some of my recent projects. Click on any project to learn more.
        </motion.p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project List */}
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectList 
          projects={projects}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
        />
      </Suspense>
    </div>
  );
}
