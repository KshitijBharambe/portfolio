import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SkillsTabsSection = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [activeSkillCategory, setActiveSkillCategory] =
    useState("cloud-devops");

  // Skill categories data
  const skillCategories = [
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      skills: [
        { name: "Containerization", logo: "/images/docker-logo.png" },
        { name: "Cloud Infrastructure", logo: "/images/aws-logo.png" },
        { name: "CI/CD Pipelines", logo: "/images/cicd-logo.png" },
        { name: "Infrastructure as Code", logo: "/images/terraform-logo.png" },
      ],
      technologies: [
        { name: "AWS", icon: "amazonwebservices" },
        { name: "Docker", icon: "docker" },
        { name: "Jenkins", icon: "jenkins" },
        { name: "Terraform", icon: "terraform" },
        { name: "GitHub", icon: "github" },
      ],
      description:
        "Building scalable cloud infrastructure and implementing efficient deployment pipelines for continuous delivery.",
    },

    {
      id: "programming",
      title: "Programming & Security",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      skills: [
        { name: "Full Stack Development", logo: "/images/fullstack-logo.png" },
        { name: "Mobile App Development", logo: "/images/mobile-logo.png" },
        { name: "Web Security", logo: "/images/security-logo.png" },
        { name: "Database Management", logo: "/images/database-logo.png" },
      ],
      technologies: [
        { name: "Python", icon: "python" },
        { name: "Java", icon: "java" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Burp Suite", icon: "burpsuite" },
      ],
      description:
        "Developing robust, secure applications with modern frameworks and following security best practices.",
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      skills: [
        { name: "Deep Learning", logo: "/images/dl-logo.png" },
        { name: "Natural Language Processing", logo: "/images/nlp-logo.png" },
        { name: "Reinforcement Learning", logo: "/images/rl-logo.png" },
      ],
      technologies: [
        { name: "PyTorch", icon: "pytorch" },
        { name: "Keras", icon: "keras" },
        { name: "Python", icon: "python" },
        { name: "Pandas", icon: "pandas" },
        { name: "NumPy", icon: "numpy" },
      ],
      description:
        "Expertise in designing and implementing AI systems, neural networks, and language models for practical applications.",
    },
  ];

  // Education data
  const education = [
    {
      degree: "Master's in Computer Science",
      specialization: "Machine Learning, Systems, and Security",
      period: "2023 - Present",
      institution: "Syracuse University",
      description:
        "Focused on AI and core computer science concepts, including advanced algorithms, machine learning, and systems design.",
    },
    {
      degree: "Bachelor's in Computer Science",
      specialization: "Software Engineering and Security",
      period: "2019 - 2023",
      institution: "New Horizon Institue of Technology & Management",
      description:
        "Built a strong foundation in software engineering, security, and computer architecture.",
    },
  ];

  // Experience data
  const experience = [
    {
      position: "DevOps Intern",
      company: "SEQURETEK Pvt. Ltd.",
      companyUrl: "https://sequretek.com", // Add the company website URL
      period: "June 2024 - Aug 2024",
      responsibilities: [
        "Engaged in Kubernetes-based deployments, contributing to scaling 100+ containers to assure high availability and optimal performance.",
        "Designed and optimized CI/CD pipelines in Jenkins, automating workflows and decreasing deployment time",
        "Automated 10+ recurring tasks using Bash scripting and Python, streamlining operations and revising efficiency.",
        "Implemented Infrastructure-as-Code with Terraform and Ansible, achieving 95% consistency in cloud infrastructure deployments.",
      ],
    },
    {
      position: "VAPT Intern",
      company: "SEQURETEK Pvt. Ltd.",
      companyUrl: "https://sequretek.com", // Add the company website URL
      period: "Jan 2021 - Dec 2021",
      responsibilities: [
        "Conducted vulnerability assessments and penetration testing on 15+ web applications, mobile apps, and networks.",
        "Utilized Burp Suite, Kali Linux, Nmap, Acunetix, Netsparker, and Nessus for manual and automated security testing.",
        "Managed incident response and containment of 5+ security incidents, reducing impact.",
        "Identified and reported 20+ vulnerabilities, including XSS, SQL injection, and mis-configurations, ensuring compliance with security best practices.",
        "Created 15+ detailed security reports for senior stakeholders, outlining risks and mitigation strategies.",
      ],
    },
  ];

  // Get the currently active skill category data
  const activeCategory =
    skillCategories.find((category) => category.id === activeSkillCategory) ||
    skillCategories[0];

  return (
    <div className="max-w-7xl mx-auto relative z-10">
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
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 shadow-lg">
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
                {activeCategory.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900/70 rounded-lg p-4 flex flex-col items-center justify-center border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800 transition-colors"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 mb-3 flex items-center justify-center relative">
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="filter grayscale hover:grayscale-0 transition-all duration-300"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
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
                                span.className =
                                  "w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 text-xl";
                                span.textContent = tech.name.charAt(0);
                                parent.appendChild(span);
                              }
                            };
                          };
                        }}
                      />
                    </div>
                    <span className="text-sm text-center text-gray-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === "education" && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 shadow-lg">
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
      )}

      {/* Experience Tab */}
      {activeTab === "experience" && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 shadow-lg">
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
                        className="hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-2"
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
      )}
    </div>
  );
};

export default SkillsTabsSection;
