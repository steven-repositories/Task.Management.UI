import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  process.env = {
    ...process.env,
    ...loadEnv("*", process.cwd())
  };

  return {
    plugins: [react({ include: /\.(ts|tsx)$/ })],
    server: {
      watch: {
        usePolling: true
      },
      strictPort: true,
      host: true,
      port: 3000
    },
    define: {
      "process.env": process.env
    }
  }
});
