/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    screens: {
      '3xl': { 'max': '2000px' },
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }
      'xlg': { 'max': '1170px' },
      // => @media (max-width: 1170px) { ... }
      'xlgm': { 'max': '1024px' },
      // => @media (max-width: 1024px) { ... }
      'lg': { 'max': '896px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
      'smx': { 'max': '500px' },
      // => @media (max-width: 400px) { ... }
      'smxl': { 'max': '457px' },
      // => @media (max-width: 400px) { ... }
    },
  },
  plugins: [],
}

