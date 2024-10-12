import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import * as path from "path";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin(["REACT_APP_TEXT"])],
  build: {
    sourcemap: true,
    target: "esnext",
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "index.html",
    },
  },
  optimizeDeps: {
    exclude: ["wasm"],
  },
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
