import React, { useState, useEffect, useRef } from "react";
// import "./AboutSection.css";
import { motion } from "framer-motion";
import Image from "next/image";
import burpIcon from "../../../public/assets/burpsuite.png";

const SkillsTabsSection = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [activeSkillCategory, setActiveSkillCategory] =
    useState("cloud-devops");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const glassCards = Array.from(
      containerRef.current.querySelectorAll(".glass-card")
    ) as HTMLElement[];

    const handleMouseMove = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const filter = document.querySelector("#glass-distortion feDisplacementMap");
      if (filter) {
        const scaleX = (x / rect.width) * 30;
        const scaleY = (y / rect.height) * 30;
        filter.setAttribute("scale", Math.min(scaleX, scaleY).toString());
      }

      const specular = element.querySelector(".glass-specular") as HTMLElement;
      if (specular) {
        specular.style.background = `radial-gradient(
          circle 220px at ${x}px ${y}px,
          rgba(255,255,255,0.15) 0%,
          rgba(255,255,255,0.05) 50%,
          rgba(255,255,255,0) 80%
        )`;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      const filter = document.querySelector("#glass-distortion feDisplacementMap");
      if (filter) {
        filter.setAttribute("scale", "77");
      }

      const specular = element.querySelector(".glass-specular") as HTMLElement;
      if (specular) {
        specular.style.background = "none";
      }
    };

    glassCards.forEach((element) => {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      glassCards.forEach((element) => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [activeTab]);

  // Skill categories data
  const skillCategories = [
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      technologies: [
        { name: "AWS", icon: "amazonwebservices" },
        { name: "Docker", icon: "docker" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "Git", icon: "git" },
        { name: "Linux", icon: "linux" },
      ],
      description: "Building scalable cloud infrastructure and implementing efficient deployment pipelines for continuous delivery.",
    },
    {
      id: "backend-api",
      title: "APIs & Backend",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      technologies: [
        { name: "Python", icon: "python" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "REST APIs", icon: "restapi", customIcon: true },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MySQL", icon: "mysql" },
      ],
      description: "Developing robust, secure applications with modern frameworks and following security best practices.",
    },
    {
      id: "frontend",
      title: "Frontend",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      technologies: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind CSS", icon: "tailwindcss" },
        { name: "TypeScript", icon: "typescript" },
      ],
      description: "Creating responsive and intuitive user interfaces for a seamless user experience.",
    },
    {
      id: "security",
      title: "Security",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.789-2.75 9.565M12 11c1.741 2.776 2.75 6.048 2.75 9.565M12 11V3m0 8c-5.042 0-9 4.01-9 9s3.958 9 9 9 9-4.01 9-9-3.958-9-9-9z"></path>
        </svg>
      ),
      technologies: [
        { name: "Burp Suite", icon: "burpsuite", customIcon: true },
        { name: "Nessus", icon: "nessus", customIcon: true },
      ],
      description: "Identifying and mitigating security vulnerabilities to ensure application and infrastructure integrity.",
    },
  ];

  // Education data
  const education = [
    {
      degree: "Masters in Computational & Informational Sciences",
      specialization: "Data Mining, AI, Operating Systems, DBMS, Algorithms, IoT Security, Intro to Data Science, Natural Language Processing",
      period: "August 2023 – May 2025",
      institution: "Syracuse University",
      description: "Relevant Coursework: Data Mining, AI, Operating Systems, DBMS, Algorithms, IoT Security, Intro to Data Science, Natural Language Processing.",
    },
    {
      degree: "Bachelors in Computer Engineering",
      specialization: "Computer Engineering",
      period: "August 2019 – May 2023",
      institution: "New Horizon Institute of Technology & Management",
      description: "Built a strong foundation in software engineering, security, and computer architecture.",
    },
  ];

  // Experience data
  const experience = [
    {
      position: "Vulnerability & Penetration Testing Team Intern",
      company: "Sequretek Pvt. Ltd.",
      companyUrl: "https://sequretek.com",
      period: "June 2024 - August 2024",
      responsibilities: [
        "Conducted vulnerability assessments across 15+ applications using Burp Suite and Kali Linux.",
        "Identified and documented 20+ vulnerabilities (XSS, SQLi, misconfigurations) with mitigation steps.",
        "Supported ISO 27001-aligned infrastructure audits and revalidation scans for compliance tracking.",
        "Collaborated with team to improve backend and network security posture.",
      ],
    },
    {
      position: "Software Engineer Team Intern",
      company: "Cognologix Technologies Pvt. Ltd.",
      companyUrl: "https://www.cognologix.com/",
      period: "June 2022 - May 2023",
      responsibilities: [
        "Contributed to backend development using Python and FastAPI; integrated over 10 secure REST APIs.",
        "Collaborated on CI workflow automation via GitHub Actions for streamlined deployment and testing.",
        "Assisted in AWS provisioning and monitoring (EC2, S3, Lambda, IAM), supporting tagging to reduce costs.",
        "Participated in PostgreSQL query tuning, improving performance by ~30% on data-heavy endpoints.",
        "Participated in sprint planning and code reviews to ensure delivery of scalable backend components.",
        "Supported documentation of API endpoints and deployment workflows to improve team onboarding.",
      ],
    },
  ];

  // Get the currently active skill category data
  const activeCategory =
    skillCategories.find((category) => category.id === activeSkillCategory) ||
    skillCategories[0];

  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.008"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>
      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Tabs navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-gray-800/50 backdrop-blur-sm rounded-full">
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "skills"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "experience"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "education"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Skills Tab Content */}
        {activeTab === "skills" && (
          <div className="glass-card">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>
            <div className="relative z-[4] p-6 md:p-8">
              {/* Skill Categories selection */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveSkillCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                      activeSkillCategory === category.id
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/50"
                        : "bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600"
                    }`}
                  >
                    <span className="text-blue-400 mr-2">{category.icon}</span>
                    {category.title}
                  </button>
                ))}
              </div>

              {/* Active skill category details */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Skill category info */}
                <div className="flex flex-col justify-center md:w-1/3">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-400 mr-3">{activeCategory.icon}</div>
                    <h4 className="text-xl font-semibold">
                      {activeCategory.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 mb-6">{activeCategory.description}</p>
                </div>

                {/* Tech logo grid */}
                <div className="md:w-2/3">
                  <h5 className="text-lg font-medium text-white mb-6">
                    Technologies & Tools
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {activeCategory.technologies.map((tech, index) => {
                      const renderCustomIcon = (tech: { name: string; icon: string }) => {
                        if (tech.icon === 'restapi') {
                          return (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          );
                        } else if (tech.icon === 'nessus') {
                          return (
                            <Image
                              src="/assets/Tenable SVG Icon.svg"
                              alt="Tenable Nessus"
                              width={32}
                              height={32}
                              className="w-8 h-8"
                            />
                          );
                        } else if (tech.icon === 'burpsuite') {
                          return (
                            <Image
                              src="/assests/burpsuite.png"
                              alt="Burp Suite"
                              width={32}
                              height={32}
                              className="w-8 h-8"
                            />
                          );
                        }
                        return <span className="text-xs text-center">{tech.name}</span>;
                      };

                      const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget as HTMLImageElement;
                        // Try plain version if original not found
                        target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;

                        target.onerror = () => {
                          // Fallback to wordmark if plain not found
                          target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain-wordmark.svg`;

                          target.onerror = () => {
                            // Final fallback to text if no icon found
                            target.onerror = null;
                            target.style.display = "none";
                            // Create fallback element
                            const parent = target.parentElement;
                            if (parent) {
                              const span = document.createElement("span");
                              span.className = "w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 text-xs";
                              span.textContent = tech.name.split(' ').map(word => word[0]).join('');
                              parent.appendChild(span);
                            }
                          };
                        };
                      };

                      return (
                        <motion.div
                          key={index}
                          className="group bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/30"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="w-12 h-12 mb-3 flex items-center justify-center relative">
                            {tech.customIcon ? (
                              <div className="w-10 h-10 flex items-center justify-center text-blue-400">
                                {renderCustomIcon(tech)}
                              </div>
                            ) : tech.icon === 'burpsuite' ? (
                              <div className="relative w-10 h-10">
                                <Image
                                  src={burpIcon}
                                  alt="Burp Suite"
                                  width={40}
                                  height={40}
                                  className="filter grayscale group-hover:grayscale-0 transition-all duration-300 rounded-md"
                                  onLoad={() => console.log('Burp Suite icon loaded successfully')}
                                  onError={(e) => {
                                    console.error('Error loading Burp Suite icon');
                                    console.log('Image src:', e.currentTarget.src);
                                  }}
                                />
                                <div className="absolute inset-0 bg-blue-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              </div>
                            ) : (
                              <Image
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                                alt={tech.name}
                                width={40}
                                height={40}
                                className="filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                onError={handleImageError}
                              />
                            )}
                          </div>
                          <span className="text-sm text-center text-gray-300">
                            {tech.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="glass-card">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>
            <div className="relative z-[4] p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400 text-center">
                Academic Journey
              </h3>

              <div className="relative border-l-2 border-blue-500 pl-8 space-y-10 ml-4">
                {education.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full bg-blue-500 border-4 border-gray-900 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-700 shadow-lg">
                      <h4 className="text-xl font-semibold text-blue-400">
                        {item.degree}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 mb-3">
                        <span className="text-gray-400">{item.institution}</span>
                        <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
                        <span className="text-gray-400 text-sm">{item.period}</span>
                      </div>
                      <p className="text-gray-300 text-sm font-medium mb-2">
                        Specialization: {item.specialization}
                      </p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="glass-card">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>
            <div className="relative z-[4] p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400 text-center">
                Professional Experience
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {experience.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 rounded-lg p-5 border border-gray-700 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400">
                          {item.position}
                        </h4>
                        <p className="text-gray-300">
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                          >
                            {item.company}
                          </a>
                        </p>
                      </div>
                      <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                        {item.period}
                      </span>
                    </div>

                    <ul className="space-y-2 text-sm text-gray-400">
                      {item.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SkillsTabsSection;
