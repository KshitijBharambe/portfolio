"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  profileData,
  journeyData,
  philosophyData,
  hobbiesData,
} from "../../public/assets/data/aboutme-data";
import { renderIcon } from "../../public/assets/data/iconMap";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const tabs = [
  { id: "background", label: "My Journey", num: "01" },
  { id: "philosophy", label: "Philosophy", num: "02" },
  { id: "certifications", label: "Certifications", num: "03" },
  { id: "hobbies", label: "Beyond Coding", num: "04" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("background");

  const handleTabChange = useCallback((tabId: string) => {
    const scrollY = window.scrollY;
    setActiveTab(tabId);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto pb-20">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">
              About
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
          </div>
          <h1
            className="font-black leading-[0.9] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
          >
            MORE ABOUT
            <br />
            <span className="gradient-text">ME.</span>
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Background, philosophies, and what drives me as an engineer.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="spotlight-card rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div
                  className="absolute inset-[-3px] rounded-full animate-spin-slow"
                  style={{
                    background: "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))",
                  }}
                />
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2" style={{ borderColor: "var(--bg)" }}>
                  <Image
                    src="/assets/profile-pic.jpeg"
                    alt="Profile picture"
                    fill
                    sizes="9rem"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                {profileData.name}
              </h3>
              <p className="text-sm font-mono text-[var(--accent)] mb-4 tracking-wider">
                {profileData.title}
              </p>
              <div className="space-y-3">
                {profileData.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/resume" className="btn-primary text-sm">
                  {renderIcon("download", "h-4 w-4")}
                  Resume
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="glass rounded-xl p-1 flex flex-wrap items-center gap-1 mb-8 w-fit">
            {tabs.map(({ id, label, num }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeTab === id
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
                style={activeTab === id ? { background: "var(--accent-dim)", border: `1px solid color-mix(in srgb, var(--accent) 30%, transparent)` } : { background: "transparent", border: "1px solid transparent" }}
              >
                <span
                  className={`font-mono text-[10px] ${
                    activeTab === id ? "text-[var(--accent)]" : ""
                  }`}
                >
                  {num}
                </span>
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div style={{ minHeight: 300 }}>
          <AnimatePresence mode="wait">
            {/* Journey */}
            {activeTab === "background" && (
              <motion.div
                key="background"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {journeyData.map((section, index) => (
                  <div
                    key={index}
                    className="spotlight-card rounded-2xl p-6 relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, transparent, var(--accent), transparent)`, opacity: 0.4 }} />
                    <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                      {section.title}
                    </h3>
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={`text-sm leading-relaxed ${pIndex < section.content.length - 1 ? "mb-3" : ""}`}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}

                <div className="spotlight-card rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-px h-full min-h-[40px] flex-shrink-0" style={{ background: "var(--accent)", opacity: 0.5 }} />
                    <div>
                      <blockquote className="italic text-sm" style={{ color: "var(--text-tertiary)" }}>
                        &ldquo;Every great developer you know got there by solving
                        problems they were unqualified to solve until they actually
                        did it.&rdquo;
                      </blockquote>
                      <p className="text-right text-xs font-mono text-[var(--accent)] mt-2">
                        — Patrick McKenzie
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Philosophy */}
            {activeTab === "philosophy" && (
              <motion.div
                key="philosophy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {philosophyData.intro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {philosophyData.principles.map((principle, index) => (
                    <div
                      key={index}
                      className="spotlight-card rounded-2xl p-6 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, var(--accent), transparent)`, opacity: 0.2 }} />
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: "var(--accent-dim)" }}>
                        <span className="text-[var(--accent)]">
                          {renderIcon(principle.icon, "h-5 w-5")}
                        </span>
                      </div>
                      <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                        {principle.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="spotlight-card rounded-2xl p-6">
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span className="text-[var(--accent)]">
                      {renderIcon("shield", "h-5 w-5")}
                    </span>
                    Development Values
                  </h3>
                  <ul className="space-y-2">
                    {philosophyData.values.map((value, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--green)] mt-0.5 flex-shrink-0">
                          {renderIcon("check", "h-4 w-4")}
                        </span>
                        <span style={{ color: "var(--text-secondary)" }}>
                          <strong style={{ color: "var(--text-primary)" }}>{value.name}:</strong>{" "}
                          {value.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {activeTab === "certifications" && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {[
                  {
                    title: "AWS Certified Solutions Architect – Associate",
                    issuer: "Amazon Web Services",
                    description: "Validated expertise in designing distributed systems, cost-optimized architectures, and resilient applications on AWS.",
                  },
                  {
                    title: "ISO/IEC 27001:2022 Lead Auditor",
                    issuer: "BSI Training",
                    description: "Certified to lead audits of Information Security Management Systems, ensuring compliance with international security standards.",
                  },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="spotlight-card rounded-2xl p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, var(--accent), transparent)`, opacity: 0.2 }} />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: "var(--accent-dim)" }}>
                        <span className="text-[var(--accent)]">
                          {renderIcon("shield", "h-5 w-5")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                          {cert.title}
                        </h3>
                        <p className="text-xs font-mono text-[var(--accent)] mb-2">{cert.issuer}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Beyond Coding */}
            {activeTab === "hobbies" && (
              <motion.div
                key="hobbies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {hobbiesData.intro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hobbiesData.interests.map((interest, index) => (
                    <div
                      key={index}
                      className="spotlight-card rounded-2xl p-6"
                    >
                      <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                        <span className="text-[var(--accent)]">
                          {renderIcon(interest.icon)}
                        </span>
                        {interest.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {interest.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-[var(--accent)] hover:opacity-80 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
