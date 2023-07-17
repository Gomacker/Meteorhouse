import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/api/v2': 'http://127.0.0.1:10317',
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
