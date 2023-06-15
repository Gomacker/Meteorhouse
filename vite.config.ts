import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
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
      '/api': {
        target: 'http://127.0.0.1:10317/api/',
        // target: 'http://test.meteorhouse.wiki:10317/api/',
        // target: 'http://test.meteorhouse.wiki/api/',
        // target: 'http://meteorhouse.wiki/api/',
        // target: 'http://test.meteorhouse.wiki/api/v1/',
        // target: 'https://alpha0317.meteorhouse.wiki/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      // '/assets': {
      //   // target: 'http://127.0.0.1:10317/assets/',
      //   // target: 'http://test.meteorhouse.wiki/assets/',
      //   target: 'http://meteorhouse.wiki/assets/',
      //   // target: 'https://alpha0317.meteorhouse.wiki/assets/',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/assets/, '')
      // },
      '/static': {
        // target: 'http://127.0.0.1:10317/static/',
        // target: 'http://test.meteorhouse.wiki:10317/static/',
        // target: 'http://test.meteorhouse.wiki/assets/',
        target: 'http://meteorhouse.wiki/static/',
        // target: 'https://alpha0317.meteorhouse.wiki/assets/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/static/, '')
      }
    }
  }
})
