/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        
      },
      backgroundImage: {
        'bg-login' : "url('../assets/images/background-auth.png')",
      }
    },
  },
  plugins: [require("daisyui")],
}
