import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import { podcastsStore } from './model/store/store.js'
import App from './App.vue'
import router from './router'

const app = createApp(App);

const store = createStore(podcastsStore); 

app.use(store);
app.use(router);


app.mount('#app');
