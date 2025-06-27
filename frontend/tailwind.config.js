/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary_dark: "rgb(31, 31, 31)",
        secondary_dark: "rgb(52, 52, 52)",
        border_light: "#e5e7eb",
        primary_pink: "#FF6384",
        decrement: "rgb(243, 180, 193)",
        increment: "rgb(188, 243, 180)",
        creambg: "rgb(249, 245, 245)",
      },
    },
  },
  plugins: [],
};
