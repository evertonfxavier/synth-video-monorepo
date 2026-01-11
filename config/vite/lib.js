import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

/**
 * Library Vite configuration for building packages
 * @param {Object} options
 * @param {string} options.entry - Entry file path
 * @param {string} options.name - Library name
 * @param {import('vite').UserConfig} options.config - Additional config
 * @returns {import('vite').UserConfig}
 */
export function createLibConfig({ entry, name, config = {} }) {
  return defineConfig({
    plugins: [react(), ...(config.plugins || [])],
    build: {
      lib: {
        entry: resolve(process.cwd(), entry),
        name,
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
          },
        },
        ...config.build?.rollupOptions,
      },
      sourcemap: true,
      ...config.build,
    },
    ...config,
  });
}

export default createLibConfig;
