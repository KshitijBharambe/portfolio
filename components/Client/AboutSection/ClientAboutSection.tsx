import React from "react";
import Link from "next/link";
import AboutHeader from "./ClientAboutHeader";
import SkillsTabsSection from "./ClientAboutSkills";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="text-white py-24 px-6 md:px-10 lg:px-14 relative w-full overflow-hidden">
      {/* Atmospheric orb glows */}
      <div
        className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)",
        }}
      />

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
