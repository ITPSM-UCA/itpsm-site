const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      primary: '#000000',
      secondary: '#ffffff',
    },
    extend: {},
  },
  plugins: [],
}
