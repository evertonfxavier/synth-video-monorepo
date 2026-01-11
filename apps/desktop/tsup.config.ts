import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["electron/main.ts"],
    format: ["cjs"],
    outDir: "dist-electron",
    clean: true,
    sourcemap: true,
    external: ["electron"],
    platform: "node",
    outExtension: () => ({ js: ".cjs" }),
  },
  {
    entry: ["electron/preload.ts"],
    format: ["cjs"],
    outDir: "dist-electron",
    clean: false,
    sourcemap: true,
    external: ["electron"],
    platform: "node",
    outExtension: () => ({ js: ".cjs" }),
  },
]);
