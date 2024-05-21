/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '424px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1220px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
