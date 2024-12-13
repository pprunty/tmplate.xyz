import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const scrollbarHide = require('tailwind-scrollbar-hide');

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        modalShow: {
          '0%': { opacity: '0', transform: 'scale(0.95)' }, // Cast opacity as a string
          '100%': { opacity: '1', transform: 'scale(1)' },  // Cast opacity as a string
        },
        modalHide: {
          '0%': { opacity: '1', transform: 'scale(1)' },    // Cast opacity as a string
          '100%': { opacity: '0', transform: 'scale(0.95)' }, // Cast opacity as a string
        },
      },
      animation: {
        modalShow: 'modalShow 0.3s ease-out forwards',
        modalHide: 'modalHide 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
      plugin(function ({ addVariant }: { addVariant: (name: string, rule: string) => void }) {
        // Adding theme-system variant
        addVariant("theme-system", ".theme-system &");
      }),
      scrollbarHide, // Add the scrollbar-hide plugin here
    ],
    future: {
      hoverOnlyWhenSupported: true,
    },
} satisfies Config;
