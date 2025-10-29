/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#050a30',
        mist: '#d0d7eb',
        royal: '#1800ad',
        snow: '#f4f6fc',
      }
    },
  },
  plugins: [],
};
