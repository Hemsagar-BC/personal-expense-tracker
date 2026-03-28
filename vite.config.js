import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png}']
      },
      manifest: {
        name: 'Kharcha - Expense Tracker',
        short_name: 'Kharcha',
        description: 'Track your big spending, simply.',
        theme_color: '#10b981',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { 
            src: '/icons/icon.svg', 
            sizes: 'any', 
            type: 'image/svg+xml'
          }
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true
      }
    }),
  ],
})
