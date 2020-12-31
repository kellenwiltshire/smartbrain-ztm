module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex:{
        '-1': '-1',
      }
    },
    fontFamily:{
      sans: ['Courier New', 'Courier', 'monospace']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
