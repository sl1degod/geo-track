import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import YmapPlugin from 'vue-yandex-maps';

const app = createApp(App)


const settings = {
    apiKey: '6f0f8a24-25f9-4b00-97e6-c58810316041',
    lang: 'ru_RU',
    coordorder: 'latlong',
    debug: false,
    version: '2.1'
}

app.use(YmapPlugin, settings).use(store).use(router).mount('#app')
