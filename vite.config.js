import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true
  },
  preview: {
    port: 8000,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})