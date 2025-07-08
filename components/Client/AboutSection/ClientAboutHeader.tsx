import React, { useEffect, useRef } from "react";
//import "./AboutSection.css";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutHeader = () => {
  const glassCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = glassCardRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const filter = document.querySelector('#glass-distortion feDisplacementMap');
      if (filter) {
        const scaleX = (x / rect.width) * 30;
        const scaleY = (y / rect.height) * 30;
        filter.setAttribute('scale', Math.min(scaleX, scaleY).toString());
      }

      const specular = element.querySelector('.glass-specular') as HTMLElement;
      if (specular) {
        specular.style.background = `radial-gradient(
          circle 220px at ${x}px ${y}px,
          rgba(255,255,255,0.15) 0%,
          rgba(255,255,255,0.05) 50%,
          rgba(255,255,255,0) 80%
        )`;
      }
    };

    const handleMouseLeave = () => {
      const filter = document.querySelector('#glass-distortion feDisplacementMap');
      if (filter) {
        filter.setAttribute('scale', '77');
      }

      if (element) {
        const specular = element.querySelector('.glass-specular') as HTMLElement;
        if (specular) {
          specular.style.background = 'none';
        }
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
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
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top section with reversed layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* LEFT SIDE - Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-glow">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-500 mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-300">
              Designing secure, scalable & intelligent tech solutions with
              expertise in AI, DevOps, and Cloud Computing
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                Background
              </h3>
              <div className="space-y-4 text-gray-300">
              <p>
                With a background in Computer Engineering and hands-on experience
                as a Software Engineer Intern, I&apos;ve contributed to backend development
                using Python, integrated secure REST APIs, and automated
                CI/CD workflows.
              </p>
              <p>
                My experience extends to cloud infrastructure, where I&apos;ve assisted in
                provisioning and monitoring AWS services (EC2, S3, Lambda), and security,
                where I&apos;ve conducted vulnerability assessments using tools like
                Burp Suite and Kali Linux.
              </p>
              <p>
                I am driven by the challenge of solving complex problems,
                whether it&apos;s tuning PostgreSQL queries to boost performance
                or developing innovative projects like an AI-powered university
                chatbot and a dynamic portfolio with Next.js.
              </p>

              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 about-profile-card"
          >
            <div className="glass-card" ref={glassCardRef}>
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div className="glass-content">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg relative">
                    <Image
                      src="/assets/profile-pic.jpeg"
                      alt="Kshitij Bharambe"
                      fill
                      sizes="(max-width: 768px) 12rem, (max-width: 1200px) 12rem, 12rem"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-xs font-medium px-3 py-1 rounded-full text-white">
                    Available for hire
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-white">Kshitij Bharambe</h3>
                  <p className="text-blue-400 font-medium">
                    Software Engineer | Cloud, DevOps & Security
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <a
                    href="/resume"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center text-sm"
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutHeader;
