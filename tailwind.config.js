/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      colors: {
        'white': '#FFFFFF',
        'black': '#081C15',
        'emerald': '#2EC4B6',
        'green': '#4ADE80',
        'primary': '#FFBF69',
        'secondary': '#CBF3F0',
        'third': '#FF9F1C',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(300deg, #4ADE80 0%, #82e1a5 75%)',
        'gradient-secondary': 'linear-gradient(300deg, #82e1a5 0%, #85ecea 75%)',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  plugins: [],
}
