module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          850: '#003366',
          860: '#003366cc',
        },
        red: {
          850: '#cc0000',
          860: '#cc0000cc',
        },
        gray: {
          350: '#E7E7E7',
          850: '#595959',
        },
      },
      zIndex: {
        n10: '-10',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
}
