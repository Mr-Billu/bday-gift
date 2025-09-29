import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Set this to your repo name if deploying to https://<user>.github.io/<repo>/
  // Example: base: '/bday-gift/'
  base: '/bday-gift/',
  plugins: [react(),
    tailwindcss()
  ],
})
