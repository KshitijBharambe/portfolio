"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import projectsData from "@/lib/projects_data.json";
import { ProjectData } from "./ClientHomePage";

interface ClientProjectsSectionProps {
  projects?: ProjectData[];
}

export default function ClientProjectsSection({
  projects = [],
}: ClientProjectsSectionProps) {
  const [localProjects, setLocalProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [visibleProjects, setVisibleProjects] = useState(3); // Show 3 projects initially

  // Load projects from props or fallback to local JSON file
  useEffect(() => {
    if (projects && projects.length > 0) {
      setLocalProjects(projects);
    } else {
      setLocalProjects(projectsData.projects);
    }
  }, [projects]);

  useEffect(() => {
    console.log("Projects from props:", projects);
    console.log("Projects from JSON:", projectsData.projects);
    if (projects && projects.length > 0) {
      console.log("Using props projects");
      setLocalProjects(projects);
    } else {
      console.log("Using JSON projects");
      setLocalProjects(projectsData.projects);
    }
  }, [projects]);

  // Animation logic
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Handle image load status
  const handleImageLoad = (id: number | string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleImageError = (id: number | string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const openProjectDetails = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetails = () => {
    setIsModalOpen(false);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  // Handle showing more projects
  const showMoreProjects = () => {
    setVisibleProjects(localProjects.length);
  };

  // Render the tech tag with a more meaningful and organized color scheme
  const renderTechTag = (tag: string, index: number) => {
    let tagStyle = "bg-gray-600/70 text-gray-200"; // Default
    const lowerCaseTag = tag.toLowerCase();

    // Frontend: Blue
    if (lowerCaseTag.includes("react") || lowerCaseTag.includes("next")) {
      tagStyle = "bg-blue-600/80 text-blue-100";
    }
    // Backend: Green/Yellow
    else if (lowerCaseTag.includes("node")) {
      tagStyle = "bg-green-600/80 text-green-100";
    } else if (lowerCaseTag.includes("python")) {
      tagStyle = "bg-yellow-500/90 text-yellow-900 font-medium";
    }
    // AI & Data Science: Purple/Teal
    else if (lowerCaseTag.includes("ai") || lowerCaseTag.includes("tensor") || lowerCaseTag.includes("nlp")) {
      tagStyle = "bg-purple-600/80 text-purple-100";
    } else if (lowerCaseTag.includes("data") || lowerCaseTag.includes("elastic") || lowerCaseTag.includes("pandas") || lowerCaseTag.includes("kibana")) {
      tagStyle = "bg-teal-600/80 text-teal-100";
    }
    // DevOps & Cloud: Orange/Indigo
    else if (lowerCaseTag.includes("docker") || lowerCaseTag.includes("aws") || lowerCaseTag.includes("devops")) {
      tagStyle = "bg-orange-600/80 text-orange-100";
    }
    // Blockchain: Indigo
    else if (lowerCaseTag.includes("blockchain") || lowerCaseTag.includes("ethereum")) {
      tagStyle = "bg-indigo-600/80 text-indigo-100";
    }

    return (
      <span
        key={index}
        className={`text-xs px-3 py-1 rounded-full inline-block m-1 ${tagStyle}`}
      >
        {tag}
      </span>
    );
  };

  // Get the currently visible projects
  const displayedProjects = localProjects.slice(0, visibleProjects);

  return (
    <section className="text-white py-24 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-glow">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            A selection of my work in AI, cloud computing, and full-stack
            development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
        >
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-200 flex flex-col"
              initial={{ y: 0 }}
              whileHover={{ y: -15 }}
              transition={{ duration: 0.05 }}
            >
              {/* Project Image with Overlay */}
              <div className="relative h-48 bg-gray-700">
                {/* Skeleton loader */}
                <div
                  className={`absolute inset-0 bg-gray-700 ${
                    imagesLoaded[project.id] === true
                      ? "hidden" : ""
                  }`}
                ></div>

                {/* Project Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={project.image || "/api/placeholder/400/200"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    onLoad={() => handleImageLoad(project.id)}
                    onError={() => handleImageError(project.id)}
                    placeholder={project.image ? 'blur' : 'empty'}
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5YzljOWMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nIHByb2plY3QuLi48L3RleHQ+PC9zdmc+"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-blue-400 transition-colors duration-200 hover:text-blue-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-3 text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                                                <div className="flex flex-wrap mb-3">
                  {project.tags
                    .slice(0, 3)
                    .map((tag: string, index: number) => renderTechTag(tag, index))}
                  {project.tags.length > 3 && (
                                                            <span key="more-tags" className="bg-gray-700/70 text-xs px-3 py-1 rounded-full text-gray-200 inline-block m-1">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Spacer to push buttons to bottom */}
                <div className="flex-grow"></div>

                {/* Actions */}
                <div className="flex justify-center mt-auto">
                  <button
                    onClick={() => openProjectDetails(project)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors flex items-center text-sm"
                    aria-label="View project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Projects Button (only if there are more projects to show) */}
        {visibleProjects < localProjects.length && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={showMoreProjects}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 flex items-center mx-auto group"
            >
              Show More Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetails}
          >
            <motion.div
              className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Project Image */}
                <div className="h-64 sm:h-80 bg-gray-800 relative">
                  {imagesLoaded[`modal-${selectedProject.id}`] !== false ? (
                    <Image
                      src={selectedProject.image || "/api/placeholder/800/400"}
                      alt={selectedProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover"
                      onLoadingComplete={() => handleImageLoad(`modal-${selectedProject.id}`)}
                      onError={() => handleImageError(`modal-${selectedProject.id}`)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 mx-auto mb-2 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p>Image not available</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                  {/* Close button */}
                  <button
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    onClick={closeProjectDetails}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Project Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">
                      Overview
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag: string, index: number) =>
                        renderTechTag(tag, index)
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-300"
                        >
                          <svg
                            className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    {selectedProject.demoLink &&
                      selectedProject.demoLink !== "#" && (
                        <a
                          href={selectedProject.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors flex items-center"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition-colors flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Source Code
                    </a>
                  </div>
                </div>
                </div> s
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>)}
