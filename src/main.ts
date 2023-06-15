import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist';

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
// import App from '@/App_bu.vue'
import AppPure from '@/AppPure.vue'
import AppCard from "@/AppCard.vue";

const pure_paths: Array<string> = [
    '/pure/test',
    '/pure/partySearcher'
]
const card_paths: Array<string> = [
    '/card/test',
    '/card/unit',
    '/card/table',
    '/card/month_table',
    '/card/armament',
    '/card/room'
]

const vuetify = createVuetify({
    components,
    directives,
})

// const app = createApp(AppPure)
if (card_paths.includes(location.pathname) || card_paths.includes(location.pathname.substring(0, location.pathname.length - 1))) {
    const app = createApp(AppCard)
    const pinia = createPinia()
    pinia.use(piniaPersist)
    app.use(pinia)
    app.use(router)
    app.use(ElementPlus)
    app.use(vuetify)

    app.mount('#app')
}else if (pure_paths.includes(location.pathname) || pure_paths.includes(location.pathname.substring(0, location.pathname.length - 1))) {
    const app = createApp(AppPure)
    const pinia = createPinia()
    pinia.use(piniaPersist)
    app.use(pinia)
    app.use(router)
    app.use(ElementPlus)
    app.use(vuetify)

    app.mount('#app')
}
else {
    const app = createApp(App)
    const pinia = createPinia()
    pinia.use(piniaPersist)
    app.use(pinia)
    app.use(router)
    app.use(ElementPlus)
    app.use(vuetify)

    app.mount('#app')
}
