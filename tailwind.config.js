/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  //include the daisyui library in the tailwind config:
  //and install the daisyui with npm install daisyui.
  plugins: [require("daisyui")],  
};
