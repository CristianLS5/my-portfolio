/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@fortawesome/**/*.js", // Add this line
  ],
  darkMode: "class", // This enables dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};
