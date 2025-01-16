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
          main: "#3B77D8",
          DEFAULT: "#242424",
          gray: "#666666",
        },
      },
    },
  },
  plugins: [],
};
