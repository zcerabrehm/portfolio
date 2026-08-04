import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The `webgl` chunk (lazy-loaded) exceeds the default 500kb warning;
    // it's deliberately deferred so it never blocks the critical path.
    chunkSizeWarningLimit: 560,
    // Keep vendor bundles cacheable + under the 500kb warning threshold.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("gsap") || id.includes("lenis")) {
              return "animations";
            }
            if (id.includes("three")) {
              return "webgl";
            }
            if (id.includes("framer-motion") || id.includes("motion")) {
              return "motion";
            }
            return "vendor";
          }
        },
      },
    },
  },
});