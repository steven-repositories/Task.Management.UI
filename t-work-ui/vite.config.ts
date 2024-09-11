import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ include: /\.(ts|tsx)$/ })],
  server: {
    watch: {
      usePolling: true
    },
    strictPort: true,
    host: true,
    port: 3000
  }
});
