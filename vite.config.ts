import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // /api/books/search → https://checkmo.shop/api/books/search 로 포워딩
      '/api': {
        target: 'https://checkmo.shop',
        changeOrigin: true,
        secure: true,
        
      },
    },
  },
});
