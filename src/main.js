import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import { podcastsStore } from './model/store/store.js'
import App from './App.vue'
import router from './router'

const app = createApp(App);

const store = createStore({
    state: podcastsStore.state,
    mutations: podcastsStore.mutations,
    actions: podcastsStore.actions,
    getters: podcastsStore.getters
});

app.use(router);
app.use(store);

app.mount('#app');
