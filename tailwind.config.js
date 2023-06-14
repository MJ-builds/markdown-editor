/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "r-slab": ["Roboto Slab Variable", "sans-serif"],
        "r-mono": ["Roboto Mono Variable", "sans-serif"],
        "r-reg": ["Roboto", "sans-serif"],
        commissioner: ["Commissioner Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
