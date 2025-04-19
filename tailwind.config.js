/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-extrabold": ["Poppins-ExtraBold", "sans-serif"],
        "poppins-light": ["Poppins-Light", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
        "poppins-italic": ["Poppins-italic", "sans-serif"],
        "poppins-mediumitalic": ["Poppins-MediumItalic", "sans-serif"],
        "judson-italic": ["Judson-Italic", "sans-serif"],
        "jomhuria-regular": ["Jomhuria-Regular", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#73C088",
          200: "#D4FEE0",
        },
        background: "#e6f0e9",
        black: {
          100: "#1E1E1E",
          200: "#4D4D4D",
          300: "#8C8E98",
          400: "#E5E5E5",
        },
        danger: "#F75555",
        status: {
          pending: "#ffcc80",
          processing: "#64b5f6",
          completed: "#a5d6a7",
        },
      },
    },
  },
  plugins: [],
};
