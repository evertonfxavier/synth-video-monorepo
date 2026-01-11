import { defineConfig } from "tsup";

export default defineConfig([
  // Browser and renderer adapters
  {
    entry: {
      index: "src/index.ts",
      browser: "src/browser/index.ts",
      electron: "src/electron/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ["electron"],
  },
  // Electron main process
  {
    entry: {
      "electron-main": "src/electron/main/main.ts",
      "electron-preload": "src/electron/main/preload.ts",
    },
    format: ["cjs"],
    dts: false,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ["electron"],
    platform: "node",
  },
]);
