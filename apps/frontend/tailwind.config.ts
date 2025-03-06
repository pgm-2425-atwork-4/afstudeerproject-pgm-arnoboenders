import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        primary50: "var(--primary-50)",
        primary100: "var(--primary-100)",
        primary200: "var(--primary-200)",
        primary300: "var(--primary-300)",
        primary500: "var(--primary-500)",
        primary600: "var(--primary-600)",
        primary700: "var(--primary-700)",
        primary800: "var(--primary-800)",
        primary900: "var(--primary-900)",
        whiteTransparent: "var(--white-transparent)",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "100%",
          md: "890px",
          lg: "1024px",
          xl: "1280px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
