/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds — white primary, near-white for raised surfaces.
        paper: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#F8F4F5",
          200: "#EFE6E9",
          300: "#E3D5DA",
        },
        // Foreground/text — near-black with a whisper of the accent hue.
        ink: {
          950: "#1A1620",
          800: "#3A3340",
          600: "#6E6774",
          500: "#8B8490",
          400: "#A79FAC",
        },
        // Secondary accent — a grown-up rose/magenta, used sparingly.
        rose: {
          DEFAULT: "#D6336C",
          300: "#F2A6C4",
          400: "#E85D9A",
          500: "#D6336C",
          600: "#A32357",
        },
      },
      fontFamily: {
        // Display: carries personality — used for names, big moments.
        display: ['"Fraunces"', "Georgia", "serif"],
        // Body/UI: precise, technical, sets everything else.
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "sans-serif"],
        // Used narrowly (tech labels, the code badge) — not for eyebrows.
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      maxWidth: {
        container: "72rem",
      },
      borderRadius: {
        panel: "0.875rem",
      },
    },
  },
  plugins: [],
};
