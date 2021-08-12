module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          850: "#003366",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
