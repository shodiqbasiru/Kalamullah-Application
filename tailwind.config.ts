import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import ScrollBar from "tailwind-scrollbar";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
        // Gold palette – richer than default yellow
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Dark surface palette
        surface: {
          50: "#1a1a1a",
          100: "#141414",
          200: "#111111",
          300: "#0d0d0d",
          400: "#0a0a0a",
          500: "#080808",
          600: "#050505",
          700: "#030303",
          800: "#020202",
          900: "#010101",
        },
      },
      fontFamily: {
        lpmq: ["LPMQ Isep Misbah", "Scheherazade New", "serif"],
        quicksand: ["Quicksand", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        oleo: ["Oleo Script", "cursive"],
        ibmarabic: ["IBM Plex Sans Arabic", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
        "fire-gradient":
          "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)",
        "dark-gradient": "linear-gradient(180deg, #111111 0%, #050505 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, transparent 60%)",
        "glow-radial":
          "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 8px rgba(245,158,11,0.15)",
        "gold-md":
          "0 4px 20px rgba(245,158,11,0.2), 0 2px 8px rgba(245,158,11,0.1)",
        "gold-lg":
          "0 8px 40px rgba(245,158,11,0.25), 0 4px 16px rgba(245,158,11,0.15)",
        "gold-glow":
          "0 0 30px rgba(245,158,11,0.3), 0 0 60px rgba(245,158,11,0.1)",
        card: "0 1px 3px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
        "card-hover":
          "0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.3)",
        "inner-gold": "inset 0 0 30px rgba(245,158,11,0.05)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "fade-in-up": "fadeInUp 0.5s ease forwards",
        "slide-in-left": "slideInLeft 0.4s ease forwards",
        "slide-in-right": "slideInRight 0.4s ease forwards",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
        float: "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245,158,11,0.2)" },
          "50%": { boxShadow: "0 0 0 8px rgba(245,158,11,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [ScrollBar],
};
