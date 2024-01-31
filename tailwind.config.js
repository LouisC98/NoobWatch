/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['Bebas'],
        roboto: ['Roboto']
      },
      colors: {
        black: '#1f1f1f',
        grey: '#696969',
        white: '#f3f3f3',
        red: '#d40000',
        green: '#00c400'
      },
      screens: {
        'xs': '455px'
      }
    }
  },
  plugins: []
}
