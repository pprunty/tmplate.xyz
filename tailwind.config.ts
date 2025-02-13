import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const scrollbarHide = require("tailwind-scrollbar-hide");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          light: "#fcfcfc",
          dark: "#0D0D0D",
        },
        primary: {
          text: {
            light: "#0D0D0D",
            dark: "#F9FAFB",
          },
          background: {
            light: "#FFFFFF",
            dark: "#0D0D0D",
            hover: {
              light: "#F5F5F5", // Light mode hover background
              dark: "#1A1A1A", // Dark mode hover background
            },
            active: {
              light: "#EAEAEA",
              dark: "#1E1E1E",
            },
          },
          border: {
            light: "#EAEAEA",
            dark: "#333",
          },
          active: {
            light: "#EAEAEA",
            dark: "#1E1E1E",
          },
        },
        secondary: {
          text: {
            light: "#868686",
            dark: "#7A7A7A",
            hover: {
              light: "#111",
              dark: "#fcfcfc",
            },
          },
          background: {
            light: "#F5F5F5",
            dark: "#1A1A1A",
          },
          border: {
            light: "#E0E0E0",
            dark: "#252525",
          },
          active: {
            light: "#DADADA",
            dark: "#2D2D2D",
          },
        },
        contrast: {
          light: "#000000",
          dark: "#FFFFFF",
          hover: {
            light: "#333333",
            dark: "#CCCCCC",
          },
          active: {
            light: "#1A1A1A",
            dark: "#E6E6E6",
          },
        },
        highlight: {
          light: "#DC70FF",
          dark: "#B065E9",
        },
      },
      keyframes: {
        modalShow: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        modalHide: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        scalePulse: {
                  '0%': { transform: 'scale(1)' },
                  '30%': { transform: 'scale(0.9)' },
                  '70%': { transform: 'scale(0.9)' },
                  '100%': { transform: 'scale(1)' },
                },
      },
      animation: {
        modalShow: "modalShow 0.3s ease-out forwards",
        modalHide: "modalHide 0.3s ease-out forwards",
        slideUp: "slideUp 0.25s ease-out forwards", // Updated duration here
        scalePulse: 'scalePulse 300ms ease-in-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("theme-system", ".theme-system &");
    }),
    scrollbarHide,
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
