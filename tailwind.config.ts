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
        background: "rgb(249 250 251)",
        foreground: "rgb(17 24 39)",
        muted: {
          DEFAULT: "rgb(243 244 246)",
          foreground: "rgb(75 85 99)",
        },
        accent: "rgb(219 234 254)",
      },
    },
  },
  plugins: [],
};
export default config;
