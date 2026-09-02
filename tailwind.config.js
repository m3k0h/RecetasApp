/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cafe: {
          50: "#FBF6EF", // fondo general de la pantalla
          100: "#F3E6D3", // fondo badge Fácil / fondo neutro
          200: "#E4CBA8", // bordes suaves, divisores
          300: "#D2AC7C", // fondo badge Media
          500: "#9C6B3E", // texto secundario, iconos
          700: "#6B4226", // texto sobre fondos claros
          900: "#3B2417", // títulos, fondo badge Difícil
        },
      },
    },
  },
  plugins: [],
};
