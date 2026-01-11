import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@synth-video/ui": resolve(__dirname, "../../packages/ui"),
    },
  },
  build: {
    sourcemap: true,
  },
});
