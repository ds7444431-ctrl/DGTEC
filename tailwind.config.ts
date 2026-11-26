import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { electric: "#1e6bff", deep: "#050b1a", navy: "#0a1530", tech: "#8a97b3" },
    boxShadow: { glow: "0 0 30px rgba(30,107,255,.45)" },
    keyframes: { float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      shine: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } } },
    animation: { float: "float 5s ease-in-out infinite", shine: "shine 6s linear infinite" } } },
  plugins: [],
};
export default config;
