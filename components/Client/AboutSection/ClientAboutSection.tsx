import React from "react";
import AboutHeader from "./ClientAboutHeader";
import SkillsTabsSection from "./ClientAboutSkills";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="gradient-bg-about text-white py-12 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header section with About title on left and Profile on right */}
      <AboutHeader />

      {/* Skills, Education, Experience tabs section */}
      <SkillsTabsSection />
      {/* View All Projects Button */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <a
          href="/aboutme"
          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center group"
        >
          More About Me
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default AboutSection;
