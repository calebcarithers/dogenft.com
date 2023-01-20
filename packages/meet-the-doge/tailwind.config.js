const baseConfig = require("dsl/tailwind.config.cjs");
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../dsl/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      fontFamily: {
        ...baseConfig.theme.extend.fontFamily,
        ComicNeue: ["var(--font-comic-neue)", "sans-serif"],
      },
    },
  },
};
