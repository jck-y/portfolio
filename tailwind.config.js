/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0B0E",
          900: "#101218",
          850: "#14161D",
          800: "#1A1D26",
        },
        mist: {
          100: "#F4F6F8",
          200: "#E4E7EC",
          300: "#C6CBD4",
          400: "#9AA1AD",
          500: "#7C8491",
          600: "#5B6270",
        },
        accent: {
          DEFAULT: "#34D399",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        container: "72rem",
      },
      borderRadius: {
        panel: "1.25rem",
      },
    },
  },
  plugins: [],
};
