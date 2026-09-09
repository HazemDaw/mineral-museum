import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Museum token system, re-tuned to sit alongside the university's
        // light, navy-and-gold identity (see README → "Оформление ...").
        // `obsidian-950` stays dark on purpose — used only for the
        // specimen-photo frame and the 3D viewer canvas, styled like a
        // lit display case inside an otherwise light page.
        obsidian: {
          950: "#0B0E16", // display-case background (photo frame, 3D canvas)
          900: "#F5F7FB", // page background
          800: "#FFFFFF", // card / panel background
          700: "#FFFFFF", // raised panel background (glass-panel)
          600: "#E4E8F0"  // light hairline reference
        },
        parchment: {
          50: "#101826",  // primary text (dark ink)
          200: "#3E4A5E", // secondary text
          400: "#69758A"  // muted / caption text
        },
        amethyst: {
          400: "#2A5DBF",
          500: "#1E4690", // primary accent — university navy blue
          600: "#163470"
        },
        malachite: {
          400: "#2F8F6E" // secondary accent (kept from the original mineral palette)
        },
        rutile: {
          400: "#B15A2E" // warm mineral accent (iron/rust tones)
        },
        citrine: {
          400: "#9C6F1B" // data highlight (hardness / density figures) — gold, AA on white
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      backgroundImage: {
        "specimen-grain":
          "radial-gradient(circle at 20% 10%, rgba(30,70,144,0.07), transparent 40%), radial-gradient(circle at 85% 60%, rgba(156,111,27,0.05), transparent 45%)"
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 8px 24px rgba(16,24,38,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
