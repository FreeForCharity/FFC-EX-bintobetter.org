import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// `.mts` rather than `.ts`: Vite's native config loader treats a bare `.ts`
// file as CommonJS, and this config is ESM. Under the old loader that only
// produced a deprecation warning; it becomes an error in a future Vite major.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  // `fileURLToPath(new URL(...))` rather than `import.meta.dirname`: the latter
  // needs Node >= 20.11 *and* a loader that preserves it, and Vite may transform
  // this file before evaluating it. `import.meta.url` survives either way.
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
