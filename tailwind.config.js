module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    layers: ['pages', 'components', 'layouts'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          850: '#003366',
          860: '#003366cc',
        },
        red: {
          850: '#BB2119',
          860: '#BB2119cc',
        },
        gray: {
          350: '#E7E7E7',
          850: '#595959',
        },
        green: {
          850: '#00a200',
        },
      },
      zIndex: {
        n10: '-10',
      },
      spacing: {
        '2/5': '40%',
      },
    },
    fontFamily: {
      lora: ['Lora'],
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
}
