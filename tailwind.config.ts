import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter-tight)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["0.8rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        container: "1200px",
        prose: "680px",
      },
      borderRadius: {
        card: "24px",
        pill: "999px",
      },
      spacing: {
        section: "clamp(6rem, 12vw, 10rem)",
        "container-x": "clamp(1.25rem, 5vw, 2.5rem)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.35), 0 14px 36px -14px rgba(0,0,0,0.55)",
        lift: "0 2px 4px rgba(0,0,0,0.4), 0 28px 60px -20px rgba(0,0,0,0.7)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
