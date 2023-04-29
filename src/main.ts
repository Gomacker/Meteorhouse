import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/main.css'

// const App = () => import('@/App.vue')
// const AppPure = () => import('@/AppPure.vue')
import App from '@/App.vue'
import AppPure from '@/AppPure.vue'
import AppCard from "@/AppCard.vue";
// const app = createApp(App)
const pure_paths = [
    '/pure/test'
]
const card_paths = [
    '/card/unit'
]
// const app = createApp(AppPure)
if (card_paths.includes(location.pathname) || card_paths.includes(location.pathname.substring(0, location.pathname.length - 1))) {
    const app = createApp(AppCard)
    app.use(createPinia())
    app.use(router)
    app.use(ElementPlus)

    app.mount('#app')
}else if (pure_paths.includes(location.pathname) || pure_paths.includes(location.pathname.substring(0, location.pathname.length - 1))) {
    const app = createApp(AppPure)
    app.use(createPinia())
    app.use(router)
    app.use(ElementPlus)

    app.mount('#app')
}
else {
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(ElementPlus)

    app.mount('#app')
}
