import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // ── Production Build (cPanel deployment) ───────────────────────────────
  // Outputs built React app into the PHP project root alongside PHP files.
  // Run: npm run build   →   upload the entire cseworkshop/ folder to public_html
  build: {
    outDir: '../',          // Output to cseworkshop/ (one level up from frontend/)
    emptyOutDir: false,     // CRITICAL: never wipe PHP files in the root
    assetsDir: 'reactapp',  // Avoid conflict with existing /assets/ PHP folder
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          forms:  ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },

  // ── Dev Server (XAMPP proxy) ────────────────────────────────────────────
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost/cseworkshop',
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        target: 'http://localhost/cseworkshop',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
