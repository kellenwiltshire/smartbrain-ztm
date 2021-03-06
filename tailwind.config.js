module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '500': '500px'
    },
    minHeight: {
      '500': '500px',
      '400': '400px',
      '3/4': '75%'
    },
    extend: {
      zIndex:{
        '-1': '-1',
      }
    },
    fontFamily:{
      sans: ['Roboto', 'monospace']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
