import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

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
  resolve: { alias: { "@": path.resolve(import.meta.dirname, ".") } },
});
