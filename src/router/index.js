import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PodcastsView from '../views/PodcastsView.vue'
import PodcastView from '../views/PodcastView.vue'
import HistoryView from '../views/HistoryView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/login',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/podcasts',
            name: 'Podcasts',
            component: PodcastsView
        },
        {
            path: '/podcasts/:id',
            name: 'Podcast',
            component: PodcastView
        },
        // {
        //   path: '/history',
        //   name: 'History',
        //   component: HistoryView
        // }
    ]
})

export default router