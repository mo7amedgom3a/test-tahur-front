import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://tahur-backend.tahuraufia.workers.dev",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
