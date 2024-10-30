import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvg } from "./src/icons/svgIcon";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), createSvg("./src/icons/svg/")],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
