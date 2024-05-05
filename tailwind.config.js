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
        jiggle: "jiggle 0.5s ease-in-out infinite",
      },
      keyframes: {
        jiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      height: {
        "86vh": "86vh",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus"],
    },
  },
  plugins: [],
};
