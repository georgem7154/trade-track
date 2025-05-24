import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import react from "@vitejs/plugin-react";

export default defineConfig({
  optimizeDeps: {
    include: ["@canvasjs/react-stockcharts"],
  },
  plugins: [react(),commonjs()],
  server: {
    proxy: {
      "/api": "https://trade-track-g6hr.onrender.com",
    },
  },
});
