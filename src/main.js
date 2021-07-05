import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import Maska from 'maska'

// const dotenv = require('dotenv');
// dotenv.config();

// console.log(process.env.API_URL);
// console.log(process.env.SOCKET_PORT);


const app = createApp(App)
    .use(router)
    .use(Maska)
    .mount('#app')
