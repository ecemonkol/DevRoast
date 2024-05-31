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
        customRed: "#E82E4D",
      },
      animation: {
        "jiggle-once": "jiggle 0.2s ease-in-out",
        "spin-infinite": "rotate 20s linear infinite",
        floating: "floating 3s ease-in-out infinite",
        "floating-diagonal": "floating-diagonal 2s ease-in-out infinite",
        "jiggle-infinite": "jiggle 0.5s ease-in-out infinite",
        "jump-and-fall": "jumpAndFall 0.5s ease-in-out infinite",
        "buzz-infinite": "buzz 3s ease-in-out infinite",
        "buzz-pause": "buzz 0.5s ease-in-out paused",
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
        "floating-diagonal": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -10px)" }, // Diagonal movement up-right
          "100%": { transform: "translate(0, 0)" },
        },
        jumpAndFall: {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-10px)" }, // Jumping up
          "50%": { transform: "translateY(0)" }, // Back to original position
          "75%": { transform: "translateY(10px)" }, // Falling down
          "100%": { transform: "translateY(0)" }, // Back to original position
        },

        stress: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-5px, -5px)" }, // Adjusted for diagonal movement
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        buzz: {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.05) rotate(3deg)" }, // Buzz up
          "50%": { transform: "scale(0.95) rotate(-3deg)" }, // Buzz down
          "75%": { transform: "scale(1.05) rotate(3deg)" }, // Buzz up
          "100%": { transform: "scale(1)" }, // Back to original scale
        },
      },
      height: {
        "86vh": "86vh",
      },
      spacing: {
        1.5: "0.375rem",
      },
      maxWidth: {
        custom: "90vw",
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
