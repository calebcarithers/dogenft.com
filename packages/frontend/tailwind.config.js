module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        ComicNeue: ["Comic Neue", "cursive"],
        PressStart: ["PressStart2P"]
      },
      colors: {
        doge: {
          red: "#DA443A",
          blue: "#55AFE7",
          magenta: "#DA44D2",
          green: "#5CBE3E",
          orange: "#F3A83C"
        },
        pleasr: {
          lightPurple: "#42114F",
          purple: "#2C1559",
          darkPurple: "#202C50"
        },
        meme: {
          green: "#3cff00",
          red: "#ff0000",
          yellow: "#f9fa1d",
          magenta: "#d922c3"
        },
        pixels: {
          yellow: {
            100: "#FFF8E4",
            200: "#ede6d4",
            300: "#d2cbbb",
            400: "#9c9688",
            500: "#7e776d"
          }
        }
      },
      backgroundImage: {
        doge: "url('/images/doge_tiled.jpeg')"
      },
      fontSize: {
        'xxs': '.6rem',
      }
    },
  },
  plugins: [],
}
