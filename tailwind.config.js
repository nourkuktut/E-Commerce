/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: "#e7f7e7",
          100: "#C2425F ",
          200: "#D4667D",
          300: "#E6889B ",
          400: "#F8ACBA ",
          500: "#B01E4140 ",
          600: "#B01E41",
          700: "#9D1A3B",
          800: "#8A1635",
          900: "#77122F",
          950: "#640E29",
        },
      },
      screens: {
        sm: "600px",
        md: "728px",
        lg: "960px",
        xl: "1220px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
