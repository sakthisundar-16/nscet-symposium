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
  // Site lives at: yourdomain.com/syntax2k26/
  // Run: npm run build  →  then run deploy.ps1  →  upload syntax2k26_cpanel.zip to cPanel
  base: '/syntax2k26/',   // ← subfolder name on cPanel (yourdomain.com/syntax2k26)
  build: {
    outDir: '../',          // Output to cseworkshop/ root alongside PHP files
    emptyOutDir: false,     // CRITICAL: never wipe PHP files in the root
    assetsDir: 'reactapp',  // Avoid conflict with existing /assets/ PHP folder

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
