/* eslint-disable global-require */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
