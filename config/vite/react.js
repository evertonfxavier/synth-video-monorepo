import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * React Vite configuration
 * @param {import('vite').UserConfig} config
 * @returns {import('vite').UserConfig}
 */
export function createReactConfig(config = {}) {
  return defineConfig({
    plugins: [react(), ...(config.plugins || [])],
    build: {
      sourcemap: true,
      ...config.build,
    },
    resolve: {
      ...config.resolve,
    },
    ...config,
  });
}

export default createReactConfig;
