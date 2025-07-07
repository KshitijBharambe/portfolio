import React from "react";
import Link from "next/link";
import AboutHeader from "./ClientAboutHeader";
import SkillsTabsSection from "./ClientAboutSkills";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="text-white py-12 px-6 md:px-8 lg:px-12 relative">

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
        <Link
          href="/about"
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
        </Link>
      </motion.div>
    </section>
  );
};

export default AboutSection;
