import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This is a shortcut for 0.0.0.0 in Vite
    port: 5173,
    strictPort: true, // Keeps the port consistent for Docker
    watch: {
      usePolling: true, // Essential for some Docker setups on Windows/Mac to detect file changes
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "src/background/worker.ts"),
        content: resolve(__dirname, "src/content/extract.ts"),
      },
      output: {
        // This ensures the files are named exactly background.js and content.js
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
