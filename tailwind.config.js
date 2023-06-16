/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple":"#0B1A51",
        'light-white':'rgba(255,255,255,0,1B  )'
      }
    },
  },
  plugins: [],
}