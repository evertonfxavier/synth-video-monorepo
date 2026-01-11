import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

/**
 * Electron Vite configuration
 * @param {import('vite').UserConfig} config
 * @returns {import('vite').UserConfig}
 */
export function createElectronConfig(config = {}) {
  return defineConfig({
    plugins: [react(), ...(config.plugins || [])],
    base: "./",
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        external: ["electron"],
        ...config.build?.rollupOptions,
      },
      ...config.build,
    },
    resolve: {
      ...config.resolve,
    },
    ...config,
  });
}

export default createElectronConfig;
