import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--white)",
        // foreground: "var(--black)",
        primary: "#2F2F2F"
      }
    }
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "5px",
          medium: "8px",
          large: "12px"
        }
      }
    })
  ]
};
export default config;
