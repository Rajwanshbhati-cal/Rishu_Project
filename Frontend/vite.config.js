// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/get-names': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/add-names': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
