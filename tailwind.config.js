/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    backgroundImage: {
      'bg': "url('/bg.svg')",
      'bg-dark': "url('/bg-dark.svg')",
    }
  },
  plugins: [],
}
