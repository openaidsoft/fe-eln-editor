import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/

export default defineConfig({
  base: process.env.ELECTRON == "true" ? "./" : ".",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["vue"],
  },

  //   resolve: {
  //     alias: {
  //       "@": fileURLToPath(new URL("./src", import.meta.url)),
  //     },

  //     // this line }
  //   },
});
