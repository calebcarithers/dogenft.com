module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ComicNeue: ["Comic Neue", "cursive"]
      },
      colors: {
        doge: {
          red: "#DA443A",
          blue: "#55AFE7",
          magenta: "#DA44D2",
          green: "#5CBE3E",
          orange: "#F3A83C"
        }
      },
      backgroundImage: {
        doge: "url('/doge_tiled.jpeg')"
      }
    },
  },
  plugins: [],
}
