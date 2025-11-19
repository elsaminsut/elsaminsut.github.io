/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        'primary-main': '#5200ff',
        'secondary-main': '#2f80ed',
        'info-main': '#9e9e9e',
        'info-light': '#e0e0e0',
        'info-dark': '#9d99a4',
        'info-contrastText': '#ffffff',
        'dark': '#272525',
        'background-color': '#fcfcfc',
      }
    },
  },
  plugins: [],
}
