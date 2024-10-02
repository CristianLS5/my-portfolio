/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // This enables dark mode
  theme: {
    extend: {
      rotate: {
        12: "12deg",
      },
    },
  },
  plugins: [],
};
