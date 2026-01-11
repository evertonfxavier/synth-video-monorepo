import { defineConfig } from "vite";

/**
 * Base Vite configuration
 * @param {import('vite').UserConfig} config
 * @returns {import('vite').UserConfig}
 */
export function createBaseConfig(config = {}) {
  return defineConfig({
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

export default createBaseConfig;
