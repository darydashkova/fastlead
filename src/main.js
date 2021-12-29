import { createApp } from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import Maska from 'maska'



const app = createApp(App)
    .use(router)
    .use(Maska)
    .mount('#app')
