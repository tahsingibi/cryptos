/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter", sans-serif',
          {
            fontFeatureSettings: '"liga","calt","cv06","cv11","cv05", "ss01"',
          },
        ],
      },
    },
  },
  plugins: [],
};
