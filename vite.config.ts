import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
      pages: resolve(__dirname, "./src/pages"),
      utils: resolve(__dirname, "./src/utils"),
      components: resolve(__dirname, "./src/components"),
    },
  },
  server: {
    open: "/index.html",
    strictPort: true,
    port: 8090,
  },
  build: {
    target: "esnext",
    sourcemap: false,
  },
});
