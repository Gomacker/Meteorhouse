import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'

import App from '@/App.vue'
// import App from '@/DefaultMode.vue'
// import AppPure from '@/PureMode.vue'
// import AppCard from '@/CardMode.vue'

const vuetify = createVuetify({
  components,
  directives
})

// let currentApp

// const cardRegex = /^\/card/
// const pureRegex = /^\/pure/

// if (cardRegex.test(location.pathname)) currentApp = AppCard
// else if (pureRegex.test(location.pathname)) currentApp = AppPure
// else currentApp = App

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(vuetify)

app.mount('#app')
