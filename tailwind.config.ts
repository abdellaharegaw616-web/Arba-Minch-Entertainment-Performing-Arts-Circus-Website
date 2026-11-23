import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amepac: {
          orange: "#C64B24",
          "orange-dark": "#A83C1A",
          "orange-light": "#E06840",
          forest: "#17251F",
          "forest-light": "#23382F",
          "forest-dark": "#0E1814",
          ivory: "#F7F3EA",
          "ivory-dark": "#EBE5D6",
          gold: "#D6A84F",
          "gold-light": "#E4BC6E",
          "gold-dark": "#B88C35",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
