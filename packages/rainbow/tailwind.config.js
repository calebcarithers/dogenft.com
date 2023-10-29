const baseConfig = require("dsl/tailwind.config.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "../dsl/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...(baseConfig?.theme || {}),
    extend: {
      ...(baseConfig?.theme?.extend || {}),
      fontFamily: {
        ...(baseConfig?.theme?.extend?.fontFamily || {}),
        quicksand: [
          ...(baseConfig?.theme?.extend?.fontFamily?.quicksand || []),
          "Quicksand",
          "sans-serif",
        ],
        fredoka: [
          ...(baseConfig?.theme?.extend?.fontFamily?.fredoka || []),
          "Fredoka",
          "sans-serif",
        ],
      },
      colors: {
        ...(baseConfig?.theme?.extend?.colors || {}),
        rainbow: {
          white: "#f4ebd7",
          yellow: "#f3ba42",
          black: "#302d25",
        },
      },
    },
  },
};
