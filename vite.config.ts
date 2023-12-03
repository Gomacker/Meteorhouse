import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      manifest: {
        name: 'Meteorhouse',
        short_name: 'Meteorhouse',
        description: '流星屋图书馆',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
          {
            src: '/static/favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: new RegExp('^https://meteorhouse.wiki'),
            handler: 'NetworkFirst'
          }
        ],
        cleanupOutdatedCaches: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      // '/api/v2': 'http://127.0.0.1:10317',
      // '/api/v2': 'http://127.0.0.1:14044',
      '/auth': 'http://127.0.0.1:14044',
      '/api': {
        // target: 'http://127.0.0.1:10317/api/',
        target: 'https://meteorhouse.wiki/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/static': {
        // target: 'http://localhost:10317/static/',
        target: 'https://meteorhouse.wiki/static/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/static/, '')
      }
    }
  },
})
