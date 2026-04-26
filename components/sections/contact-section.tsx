"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { sendEmail } from "@/app/actions/send-email";

const ContactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const spotlightFrameRef = useRef<number | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearStatusLater = useCallback(() => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setSubmitStatus(null), 5000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      setStatusMessage("Please fill in all required fields.");
      clearStatusLater();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitStatus("error");
      setStatusMessage("Please enter a valid email address.");
      clearStatusLater();
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "No Subject",
        message: formData.message,
      });
      if (result.success) {
        setSubmitStatus("success");
        setStatusMessage(result.message || "Message sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        setStatusMessage(result.error || "Failed to send.");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
      clearStatusLater();
    }
  };

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (spotlightFrameRef.current !== null) return;

    spotlightFrameRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
      spotlightFrameRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (spotlightFrameRef.current !== null) cancelAnimationFrame(spotlightFrameRef.current);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const contactLinks = [
    {
      label: "Email",
      value: "kshitij.b@mailmywork.com",
      href: "mailto:kshitij.b@mailmywork.com",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "+1 (315) 374-9649",
      href: "tel:+13153749649",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97c.37-.278.527-.759.417-1.173L6.963 3.102A1.125 1.125 0 005.872 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "KshitijBharambe",
      href: "https://github.com/KshitijBharambe",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "kshitijbharambe",
      href: "https://www.linkedin.com/in/kshitijbharambe/",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: "Location",
      value: "Princeton, NJ",
      href: undefined,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-14 md:pt-24 md:pb-14 px-4 relative w-full min-h-[80vh] md:min-h-[calc(100vh-10rem)] flex items-center overflow-visible">

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em] uppercase">04 / Contact</span>
          <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-end mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}
            >
              LET&apos;S
              <br />
              <span className="gradient-text">TALK.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-xl lg:justify-self-end lg:text-right"
          >
            Open to backend, AI platform, distributed systems, and cloud-native engineering conversations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          {/* Contact info spotlight card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="spotlight-card rounded-2xl p-6 md:p-7" onMouseMove={handleSpotlight}>
              <div className="relative z-[1] mb-5">
                <p className="text-[10px] font-mono text-[var(--accent)] tracking-[0.25em] uppercase mb-2">Reach Me</p>
                <h3 className="text-xl font-bold text-[var(--foreground)]">Direct channels</h3>
              </div>

              <div className="relative z-[1] grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {contactLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className={`group flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-hover-bg)] p-3 transition-all duration-300 hover:border-[var(--accent)]/30 ${
                      link.label === "Email" ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""
                    }`}
                  >
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg border border-[var(--card-border)] text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all duration-300">
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-mono text-[var(--text-muted)] tracking-widest uppercase">{link.label}</p>
                      {link.href ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors truncate block"
                        >
                          {link.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[var(--text-secondary)] truncate">{link.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form spotlight card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`spotlight-card rounded-2xl p-6 md:p-8 ${inView ? "shimmer" : ""}`} onMouseMove={handleSpotlight}>
            <form onSubmit={handleSubmit} className="relative z-[1] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2">
                    Your Name <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="input-surface" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2">
                    Email <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="input-surface" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can I help?" className="input-surface" />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2">
                  Message <span className="text-[var(--accent)]">*</span>
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Your message..." className="input-surface resize-none" />
              </div>

              <div className="space-y-3">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full justify-center ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                  whileHover={isSubmitting ? {} : { scale: 1.01 }}
                  whileTap={isSubmitting ? {} : { scale: 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`text-sm font-mono text-center py-3 rounded-xl border ${
                        submitStatus === "success"
                          ? "border-[var(--green)]/40 text-[var(--green)] bg-[var(--green)]/5"
                          : "border-red-500/40 text-red-400 bg-red-500/5"
                      }`}
                    >
                      {statusMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
