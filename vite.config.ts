import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://cf2e-44-203-20-211.ngrok-free.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
