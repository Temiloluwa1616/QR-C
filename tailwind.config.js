/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}",  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {

      backgroundImage:{
        'HeroBG': "url('/src/assets/HeroImg.jpg')",
        'Dev' : "url('/src/assets/devv.jpg')",
        'Fbg' : "url('/src/assets/Fbg.jpg')",
        'bgg' : "url('/src/assets/bgg.jpg')"
      },
    },
  },
  plugins: [],
}

