/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // Enable JIT mode
  purge: ["./src/**/*.{js,jsx,ts,tsx,html}"], // Specify your template paths

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        highrise: ["Highrise", "sans-serif"], // You can name it anything like 'custom'
      },
    },
  },
  plugins: [],
};
