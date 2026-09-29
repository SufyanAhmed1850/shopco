import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Deploy target subpath, e.g. SITE_BASE=/shopco/ for GitHub Pages preview.
  base: process.env.SITE_BASE ?? '/',
})
