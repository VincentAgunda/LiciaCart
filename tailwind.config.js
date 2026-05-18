/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-white': '#F5F5F7',
        'black': '#000000',
        'off-white': '#FAFAFA',
        'gray-text': '#979797',
        'apple-blue': '#007aff',
        'apple-blue': '#0071e3',
  
        'custom-gray': '#dee0e0',
      },
    },
  },
  plugins: [],
};