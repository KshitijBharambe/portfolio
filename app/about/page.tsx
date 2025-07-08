"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  profileData,
  journeyData,
  philosophyData,
  hobbiesData,
} from "../../public/assets/data/aboutme-data";
import { renderIcon } from "../../public/assets/data/iconMap";
import StarsCanvas from "@/components/Client/StarsBackground";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("background");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
            <div className="min-h-screen text-white pt-24 px-4">
            <StarsCanvas />
      <div className="max-w-5xl mx-auto pb-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-glow">
            About Me
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get to know more about my background, philosophies, and what drives
            me as a developer
          </p>
        </motion.div>

        {/* Profile Card - Center aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 shadow-lg mb-10 hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Profile Section - Centered */}
            <div className="md:w-1/3 flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-blue-500">
                  <Image
                    src="/assets/profile-pic.jpeg"
                    alt="Profile picture"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                {/* <div className="absolute -bottom-2 -right-2 bg-green-500 text-xs font-medium px-3 py-1 rounded-full text-white">
                  Available for hire
                </div> */}
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white">
                  {profileData.name}
                </h3>
                <p className="text-blue-400 font-medium">{profileData.title}</p>
              </div>

              <div className="flex items-center">
                <Link
                  href="/resume"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center text-sm"
                >
                  {renderIcon("download", "h-4 w-4 mr-2")}
                  Resume
                </Link>
              </div>
            </div>

            {/* Bio Section */}
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400 hidden md:block">
                Background
              </h3>
              <div className="space-y-4 text-gray-300">
                {profileData.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <div className="mb-8">
          <div className="flex justify-center bg-gray-800/50 backdrop-blur-sm rounded-full">
            <button
              onClick={() => setActiveTab("background")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                activeTab === "background"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              My Journey
            </button>
            <button
              onClick={() => setActiveTab("philosophy")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                activeTab === "philosophy"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Philosophy
            </button>
            <button
              onClick={() => setActiveTab("hobbies")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                activeTab === "hobbies"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Beyond Coding
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 mb-10">
          {/* My Journey Tab */}
          {activeTab === "background" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">
                My Journey
              </h2>

              <motion.div
                variants={itemVariants}
                className="space-y-6 text-gray-300"
              >
                {journeyData.map((section, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/50"
                  >
                    <h3 className="text-xl font-medium text-white mb-3">
                      {section.title}
                    </h3>
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={
                          pIndex < section.content.length - 1 ? "mb-4" : ""
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}

                <div className="relative pl-6 border-l-2 border-blue-500">
                  <blockquote className="italic text-gray-400">
                    &ldquo;Every great developer you know got there by solving
                    problems they were unqualified to solve until they actually
                    did it.&rdquo;
                  </blockquote>
                  <p className="text-right text-sm text-blue-400 mt-2">
                    — Patrick McKenzie
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Philosophy Tab */}
          {activeTab === "philosophy" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">
                Philosophy & Approach
              </h2>

              <motion.div variants={itemVariants}>
                <p className="text-gray-300 mb-6">{philosophyData.intro}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {philosophyData.principles.map((principle, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
                    >
                      <div
                        className={`bg-${principle.color}-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                      >
                        <span className={`text-${principle.color}-400`}>
                          {renderIcon(principle.icon, "h-6 w-6")}
                        </span>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-gray-300">{principle.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/30">
                  <h3 className="text-xl font-medium text-white mb-4 flex items-center">
                    <span className="text-blue-400 mr-2">
                      {renderIcon("shield", "h-6 w-6")}
                    </span>
                    Development Values
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {philosophyData.values.map((value, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 flex-shrink-0 mt-0.5">
                          {renderIcon("check", "h-5 w-5")}
                        </span>
                        <span>
                          <strong className="text-white">{value.name}:</strong>{" "}
                          {value.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Beyond Coding Tab */}
          {activeTab === "hobbies" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">
                Beyond Coding
              </h2>

              <motion.div variants={itemVariants} className="space-y-8">
                <p className="text-gray-300">{hobbiesData.intro}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hobbiesData.interests.map((interest, index) => (
                    <div
                      key={index}
                      className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/50"
                    >
                      <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                        <span className={`text-${interest.color}-400 mr-2`}>
                          {renderIcon(interest.icon)}
                        </span>
                        {interest.title}
                      </h3>
                      <p className="text-gray-300">{interest.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            {renderIcon("arrow-left", "h-5 w-5 mr-2")}
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
