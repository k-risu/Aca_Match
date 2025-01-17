/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-up": "scaleUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
      colors: {
        brand: {
          BTBlue: "#3B77D8",
          BTBlueHover: "#2F5FB5",
          BTWhite: "#E8EEF3",
          BTWhiteHover: "#C4D9E9",
          default: "#242424",
          gray: "#666666",
        },
      },
    },
  },

  plugins: [],
};
