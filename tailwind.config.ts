import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        surface: {
          low: "var(--surface-low)",
          subtle: "var(--surface-subtle)",
        },
        ink: {
          950: "var(--ink-950)",
          700: "var(--ink-700)",
          600: "var(--ink-600)",
        },
        stroke: "var(--stroke)",
        primary: {
          DEFAULT: "#0a61f9",
          400: "#3967ff",
          300: "#8299fe",
          200: "#aab7fe",
        },
        overlay: "var(--overlay)",
      },
      borderRadius: {
        md: "8px",
        xl: "16px",
        "2xl": "20px",
      },
      maxWidth: {
        page: "1222px",
      },
      backdropBlur: {
        header: "40px",
      },
    },
  },
  plugins: [],
};
export default config;
