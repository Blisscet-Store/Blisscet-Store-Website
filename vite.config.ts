import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
})

build: {
  chunkSizeWarningLimit: 1000, // increase limit if needed
  rollupOptions: {
    output: {
      manualChunks: {
        // Example: split vendor libraries into separate chunk
        vendor: ['react', 'react-dom', 'other-large-library'],
      }
    }
  }
}
