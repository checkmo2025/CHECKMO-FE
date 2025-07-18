/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        "button-brown": "#A6917D",
        "gray-1": "#2C2C2C",
      },
    },
  },
  plugins: [],
};
