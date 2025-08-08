import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // /api/books/search → https://{서버 도메인}/api/books/search 로 포워딩
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
