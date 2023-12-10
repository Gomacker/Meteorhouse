import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'

import App from '@/App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'changePrimary',
    themes: {
      'changePrimary': {
        colors: {
          primary: 'rgb(90, 49, 255)'
        }
      }
    }
  }
})

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
