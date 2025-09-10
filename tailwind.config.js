/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // scan all files inside src/
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/auth/SignInScreen.jsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
