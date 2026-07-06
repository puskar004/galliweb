import type { Config } from "tailwindcss";

// These colors and fonts are the design tokens agreed on for GalliWeb:
// Ink Navy background, Marigold + Teal accents, Fraunces/Inter/JetBrains Mono type.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F1729",
        "ink-2": "#151F38",
        paper: "#FAFAF7",
        marigold: {
          DEFAULT: "#F5A623",
          dim: "#C9860F",
        },
        teal: {
          DEFAULT: "#1B998B",
          deep: "#0D5E55",
        },
        charcoal: "#1A1D29",
        slate: "#6B7280",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
