import React from "react";
import Link from "next/link";
import AboutHeader from "./ClientAboutHeader";
import SkillsTabsSection from "./ClientAboutSkills";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-24 px-6 md:px-10 lg:px-14 relative w-full overflow-hidden">

      <AboutHeader />

      <div className="mt-16">
        <SkillsTabsSection />
      </div>

      <motion.div
        className="mt-12 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link href="/about" className="btn-outline inline-flex items-center gap-2">
          More About Me
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
