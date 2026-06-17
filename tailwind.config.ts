import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        xhs: {
          50: "#fff1f3",
          100: "#ffe0e6",
          200: "#ffc8d3",
          300: "#ff9eb1",
          400: "#ff6b8a",
          500: "#ff2442",
          600: "#e61033",
          700: "#c0002a",
          800: "#9b0a26",
          900: "#7d0a23"
        }
      },
      fontFamily: {
        sans: [
          "PingFang SC",
          "Microsoft YaHei",
          "Helvetica Neue",
          "system-ui",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 8px 24px rgba(255, 36, 66, 0.12)",
        card: "0 4px 16px rgba(0, 0, 0, 0.06)"
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
