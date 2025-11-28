/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        midnight: "#050816",
        neon: "#38bdf8",
        orchid: "#a855f7",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at top, rgba(56,189,248,0.2), transparent 60%)",
      },
    },
  },
  plugins: [],
};
