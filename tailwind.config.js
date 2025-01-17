/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
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
