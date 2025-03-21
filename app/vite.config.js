import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};