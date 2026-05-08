import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    browser: "msedge",
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ← le port de ton backend Express
        changeOrigin: true,
      }
    }
  }
})