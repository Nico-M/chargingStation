import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import path from "path";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  base: "/chargingStation",
  plugins: [vue(), UnoCSS(), svgLoader()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
