module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter, ui-sans-serif, system-ui"],
    },
    boxShadow: {
      card: "0px 1px 3px #707070",
    },
    extend: {
      animation: {
        dash: "dash 1s ease-in-out infinite",
      },
      keyframes: {
        dash: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
