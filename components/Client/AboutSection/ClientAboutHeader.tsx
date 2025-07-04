import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutHeader = () => {
  return (
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
                With a strong foundation in Java, Data Structures & Algorithms,
                and Cybersecurity, I have expanded my expertise into AI, DevOps,
                and Cloud technologies.
              </p>
              <p>
                My focus is on developing secure, scalable architectures and
                automating workflows to solve complex technical challenges. As a
                Master&apos;s student, I&apos;m constantly exploring new technologies and
                methodologies.
              </p>
              <p>
                I have experience working on projects that combine cutting-edge
                AI techniques with robust cloud infrastructure, creating
                solutions that are both innovative and production-ready.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg relative">
                  <Image
                    src="/profile-pic.jpeg"
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
                <h3 className="text-2xl font-bold text-white">Kshitij B.</h3>
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
                {/* <a
                  href="mailto:kshitij.bharambe@gmail.com"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center text-sm"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact
                </a> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutHeader;
