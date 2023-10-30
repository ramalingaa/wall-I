
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js, jsx, tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}","./src/components/**/*.{js,ts,jsx,tsx}","./src/pages/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
    light: {
      colors: {
        primary: "#0070f3",

      },
    }
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF", // or DEFAULT
          foreground: "#11181C", // or 50 to 900 DEFAULT
          primary: {
            //... 50 to 900
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
          // ... rest of the colors
        },
      },
      dark: {
        colors: {
          background: "#000000", // or DEFAULT
          foreground: "#ECEDEE", // or 50 to 900 DEFAULT
          primary: {
            //... 50 to 900
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        },
        // ... rest of the colors
      },
      mytheme: {
        // custom theme
        extend: "dark",
        colors: {
          primary: {
            DEFAULT: "#BEF264",
            foreground: "#000000",
          },
          focus: "#BEF264",
        },
      },
    },
  }),],
}

