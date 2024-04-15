/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        arrowLeft: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(10px)' },
        },
        arrowRight: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-10px)' },
        },
        modalScale:{
          '0%': {transform: 'scale(0)' },
          '100%': {transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}

