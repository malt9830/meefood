import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/meefood-update/",
  plugins: [
    vue(),
    Components({}),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        {
          axios: [["default", "axios"]],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
