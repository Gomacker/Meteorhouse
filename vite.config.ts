import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // VitePWA({
    //   manifest: {
    //     name: 'Meteorhouse',
    //     short_name: 'Meteorhouse',
    //     description: '流星屋图书馆',
    //     start_url: '/',
    //     display: 'standalone',
    //     background_color: '#fff',
    //     theme_color: '#fff',
    //     icons: [
    //       {
    //         src: '/static/worldflipper/unit/square212x/base/devil_princess_xm20.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       }
    //     ]
    //   },
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: new RegExp('^https://meteorhouse.wiki/'),
    //         handler: 'NetworkFirst'
    //       }
    //     ],
    //     cleanupOutdatedCaches: true
    //   }
    // })
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
      '/api/v2': 'http://127.0.0.1:14044',
      '/api': {
        // target: 'http://127.0.0.1:10317/api/',
        target: 'https://meteorhouse.wiki/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      //'/api/v2': {
      //   target: 'http://127.0.0.1:10317',
      //   // target: 'https://meteorhouse.wiki/api/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api\/v2/, '')
      // },
      '/static': {
        // target: 'http://localhost:10317/static/',
        target: 'https://meteorhouse.wiki/static/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/static/, '')
      }
    }
  }
})
