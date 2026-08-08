/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        obsidian: "#08080a",
        surface: "#0e0e12",
        slate: "#161618",
        line: "rgba(255,255,255,0.08)",
        mute: "#A1A1AA",
        fog: "#d4d4d8",
        chalk: "#FFFFFF",
        signal: "#CCFF00",
        warn: "#ff3300",
        ink: "#050505",
        carbon: "#08080a",
        panel: "#0e0e12",
        ember: "#CCFF00",
        paper: "#FFFFFF",
      },
      fontFamily: {
        display: ["Syne", "IBM Plex Sans", "system-ui", "sans-serif"],
        sans: ["Inter", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        mega: "-0.04em",
        tightest: "-0.055em",
        label: "0.16em",
      },
      borderRadius: {
        card: "2px",
      },
      boxShadow: {
        panel:
          "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px -24px rgba(0,0,0,0.65)",
        signal:
          "0 0 0 1px rgba(204,255,0,0.35), 0 0 28px -6px rgba(204,255,0,0.35)",
        glass: "0 8px 32px -12px rgba(0,0,0,0.55)",
        dock: "0 12px 40px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.85)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(204,255,0,0.45)" },
          "70%": { boxShadow: "0 0 0 10px rgba(204,255,0,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(204,255,0,0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        mesh: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(4%, -3%) scale(1.08)" },
          "100%": { transform: "translate(-3%, 4%) scale(1.04)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-4%, 3%)" },
          "40%": { transform: "translate(3%, -4%)" },
          "60%": { transform: "translate(-3%, -2%)" },
          "80%": { transform: "translate(4%, 2%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "grid-drift": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-56px,-56px,0)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s ease-out infinite",
        float: "float 6s ease-in-out infinite",
        mesh: "mesh 18s ease-in-out infinite alternate",
        grain: "grain 8s steps(10) infinite",
        marquee: "marquee 48s linear infinite",
        "marquee-rev": "marquee-rev 56s linear infinite",
        "grid-drift": "grid-drift 28s linear infinite",
      },
    },
  },
  plugins: [],
};
