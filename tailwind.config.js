/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "one" : "#fffff0",
        "two" : "#D8C4B6",
        "three" : "#4F709C",
        "four" : "#213555",
      }
    },
  },
  plugins: [],
}