import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  server: {
    port: 5174,
    strictPort: true,
    open: false, // Desktop app - não abre automaticamente no browser
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@synth-video/ui": resolve(__dirname, "../../packages/ui"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ["electron"],
    },
  },
});
