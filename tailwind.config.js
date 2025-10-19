import plugin from 'tailwindcss/plugin';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif']
      },
      colors: {
        hospitalGreen: '#00796B',
        cream: '#FDF6EC',
        darkGreen: '#004D40',
        accentYellow: '#FFD54F'
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
        fadeInSlow: 'fadeIn 1.2s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    }
  },
  plugins: [
    scrollbarHide
  ]
};
