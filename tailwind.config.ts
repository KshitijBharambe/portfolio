import { PluginAPI } from "tailwindcss/types/config";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00e5ff",
          dark:    "#00b8d9",
        },
        secondary: {
          DEFAULT: "#a855f7",
        },
        accent: {
          green: "#39ff14",
          cyan:  "#00e5ff",
          purple:"#a855f7",
        },
        surface: "#0d0d0d",
        theme: {
          "bg-primary":    "var(--bg)",
          "bg-secondary":  "var(--surface)",
          "text-primary":  "var(--white)",
          "text-secondary":"var(--muted)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif","system-ui","-apple-system",
          "BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New","monospace",
        ],
        gendy: ["Gendy","ui-sans-serif","system-ui"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem,12vw,10rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(3rem,8vw,7rem)",   { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem,5vw,4rem)",   { lineHeight: "1",   letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        "neon-cyan":   "0 0 20px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.15)",
        "neon-purple": "0 0 20px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.15)",
        "neon-sm":     "0 0 10px rgba(0,229,255,0.3)",
        glow:          "0 0 15px rgba(0,229,255,0.4)",
      },
      animation: {
        blink:       "blink 1s step-end infinite",
        float:       "float-up 4s ease-in-out infinite",
        "scroll-dot":"scroll-dot 1.4s ease-in-out infinite",
        "glitch-1":  "glitch-1 3s infinite linear alternate-reverse",
        "glitch-2":  "glitch-2 3s infinite linear alternate-reverse",
        ping:        "ping 1.2s cubic-bezier(0,0,.2,1) infinite",
        "lamp-width":"lamp-width 1.2s ease-in-out forwards",
      },
      keyframes: {
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        "float-up": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        "scroll-dot": {
          "0%":   { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
        "glitch-1": {
          "0%,100%": { clipPath: "inset(0 0 100% 0)" },
          "10%": { clipPath: "inset(10% 0 85% 0)", transform: "translate(-4px)" },
          "30%": { clipPath: "inset(40% 0 50% 0)", transform: "translate(4px)" },
          "50%": { clipPath: "inset(70% 0 20% 0)", transform: "translate(-4px)" },
        },
        "glitch-2": {
          "0%,100%": { clipPath: "inset(0 0 100% 0)" },
          "10%": { clipPath: "inset(5% 0 90% 0)",  transform: "translate(4px)" },
          "30%": { clipPath: "inset(35% 0 55% 0)", transform: "translate(-4px)" },
          "50%": { clipPath: "inset(60% 0 30% 0)", transform: "translate(4px)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".text-shadow-cyan":  { textShadow: "0 0 20px rgba(0,229,255,0.6), 0 0 60px rgba(0,229,255,0.2)" },
        ".text-shadow-purple":{ textShadow: "0 0 20px rgba(168,85,247,0.6), 0 0 60px rgba(168,85,247,0.2)" },
        ".text-shadow-blue-glow":      { textShadow: "0 0 15px rgba(0,229,255,0.5)" },
        ".text-shadow-blue-light-glow":{ textShadow: "0 0 15px rgba(0,229,255,0.3)" },
        ".writing-vertical": { writingMode: "vertical-rl", textOrientation: "mixed" },
      });
    },
  ],
};
