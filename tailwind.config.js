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
        floating: "floating 3s ease-in-out infinite",
        stress: "stress 0.5s infinite",
      },
      keyframes: {
        jiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        floating: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        stress: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-5px, -5px)" }, // Adjusted for diagonal movement
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
