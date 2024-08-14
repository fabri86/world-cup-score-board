import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@world-cup/common": path.resolve(__dirname, "../common/src"),
    },
  },
});
