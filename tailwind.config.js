/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPink: "#FD78AF",
        customGreen: "#2AC080",

        customBlue: "#216FE7",

        customBeige: "#FAFAEE",
      },
      animation: {
        jiggle: "jiggle 0.5s ease-in-out",
      },
      keyframes: {
        jiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
