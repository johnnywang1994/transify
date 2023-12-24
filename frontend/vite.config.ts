import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import dynamicImport from "vite-plugin-dynamic-import";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dynamicImport(),
    // vite-plugin-pages demo
    // https://codesandbox.io/s/vite-plugin-pages-nesting-routes-3ss38
    Pages({
      pagesDir: [{ dir: "src/pages", baseRoute: "" }],
      extensions: ["tsx"],
      extendRoute(route) {
        if (!route.element) return route;
        return {
          ...route,
          filepath: route.element.replace("/src/", ""),
        };
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        // add your cjs plugin here to got esbuild as ES Module
        esbuildCommonjs(["codemirror"]),
      ],
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
