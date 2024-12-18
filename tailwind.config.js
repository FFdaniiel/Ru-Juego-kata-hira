/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales con variantes
        primary: {
          light: '#F4D1B0',
          DEFAULT: '#ECB390',  // first-bg original
          dark: '#E59E70'
        },
        secondary: {
          light: '#F2DEC4',
          DEFAULT: '#EDCFA9',  // second-bg original
          dark: '#E8C08E'
        },
        accent: {
          light: '#E58976',
          DEFAULT: '#DF7861',  // comp original
          dark: '#D9674C'
        },
        text: {
          light: '#FDFBF4',
          DEFAULT: '#FCF8E8',  // font-primary original
          dark: '#F7EFD1'
        }
      },
      fontFamily: {
        'jp': ['Noto Sans JP', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif']
      },
      // Añadimos algunas sombras personalizadas
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card': '0 8px 16px rgba(0, 0, 0, 0.1)'
      },
      // Añadimos algunas transiciones personalizadas
      transitionProperty: {
        'transform': 'transform',
        'all': 'all'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}