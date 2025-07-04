// tailwind.config.js
import { PluginAPI } from "tailwindcss/types/config";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables dark mode with the 'dark' class
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          dark: "#2563eb", // blue-600
        },
        secondary: {
          DEFAULT: "#10b981", // emerald-500
        },

        // Theme colors
        theme: {
          "bg-primary": "var(--bg-primary)",
          "bg-secondary": "var(--bg-secondary)",
          "text-primary": "var(--text-primary)",
          "text-secondary": "var(--text-secondary)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        gendy: ["Gendy", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(59, 130, 246, 0.5)",
      },
      textShadow: {
        "blue-glow": "0 0 15px rgba(59, 130, 246, 0.5)",
        "blue-light-glow": "0 0 15px rgba(59, 130, 246, 0.3)",
      },
      animation: {
        blink: "blink 1s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      transitionProperty: {
        theme: "background-color, color",
      },
    },
  },
  plugins: [
    // Add a plugin for text shadow support
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        ".text-shadow-blue-glow": {
          textShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
        },
        ".text-shadow-blue-light-glow": {
          textShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
