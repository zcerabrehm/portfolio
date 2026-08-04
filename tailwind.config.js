/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        carbon: "#0b0b0c",
        panel: "#121214",
        ember: "#e8ff4d",
        paper: "#f3f3f0",
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        mega: "-0.04em",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 38s linear infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        mesh: "mesh 18s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-4%, 3%)" },
          "40%": { transform: "translate(3%, -4%)" },
          "60%": { transform: "translate(-3%, -2%)" },
          "80%": { transform: "translate(4%, 2%)" },
        },
        mesh: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(4%, -3%) scale(1.08)" },
          "100%": { transform: "translate(-3%, 4%) scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
