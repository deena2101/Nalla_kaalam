console.log(">>> TAILWIND CONFIG LOADED <<<");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "src/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "src/components/*.{js,jsx}",
    "src/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#fbf7ee',
          base: '#f5eedc',
          dark: '#e8dbbe',
        },
        vermilion: {
          DEFAULT: '#8f1d1d',
          dark: '#5a1111',
          glow: '#b82828',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        manjari: ['Manjari', 'sans-serif'],
        gayathri: ['Gayathri', 'sans-serif'],
        chilanka: ['Chilanka', 'cursive'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
