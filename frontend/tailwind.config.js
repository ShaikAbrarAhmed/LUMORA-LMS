/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumora: {
          bg: '#0A0A0A',
          surface: '#141414',
          primary: '#FFFFFF',
          secondary: '#A8A8A8',
          accent: '#D9D9D9',
          highlight: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      }
    },
  },
  plugins: [],
}
