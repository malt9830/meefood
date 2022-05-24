module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter, ui-sans-serif, system-ui"],
    },
    boxShadow: {
      card: "0px 1px 3px #707070",
      top: "0px -3px 10px #707070",
      bottom: "0px 3px 10px #707070",
      topline: "0px -1px 1px #707070",
    },
    extend: {
      animation: {
        dash: "dash 1s ease-in-out infinite",
        twirl: "twirl 6s cubic-bezier(.5,-0.8,.34,1.56) infinite",
      },
      keyframes: {
        dash: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        twirl: {
          "0%": { transform: "rotateY(0deg)" },
          "25%": { transform: "rotateY(360deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
