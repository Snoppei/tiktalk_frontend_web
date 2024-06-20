import './assets/main.css'
import { Buffer } from 'buffer';
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { podcasts } from './model/store/store.js'
import App from './App.vue'
import router from './router'
import process from 'process'

window.Buffer = Buffer;
window.process = process;

const app = createApp(App);

const store = createStore({
    modules: {
      podcasts,
    }
  });

app.use(store);
app.use(router);


app.mount('#app');
