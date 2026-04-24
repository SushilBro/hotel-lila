import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0F766E",
          secondary: "#F59E0B",
          background: "#F8FAFC",
          text: "#0F172A",
          muted: "#64748B"
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 118, 110, 0.10)"
      }
    }
  }
};

export default preset;
