/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        panel: "var(--color-panel)",
        card: "var(--color-card)",
        teal: "var(--color-teal)",
        muted: "var(--color-muted)",
        breakdown: "var(--color-breakdown)",
        tealmuted: "var(--color-teal-muted)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
