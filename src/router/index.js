import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PodcastsView from '../views/PodcastsView.vue'
import PodcastView from '../views/PodcastView.vue'
import HistoryView from '../views/HistoryView.vue'
import HistoryPodcastView from '../views/HistoryPodcastView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'Login', component: LoginView },
        { path: '/podcasts', name: 'Podcasts', component: PodcastsView, meta: { requiresAuth: true } },
        { path: '/podcasts/:id', name: 'Podcast', component: PodcastView, meta: { requiresAuth: true } },
        { path: '/history', name: 'History', component: HistoryView, meta: { requiresAuth: true } },
        { path: '/history/:id', name: 'HistoryPodcast', component: HistoryPodcastView, meta: { requiresAuth: true } }
    ]
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (to.matched.some(record => record.meta.requiresAuth) && (!isAuthenticated || isAuthenticated === 'false')) {
      next({ name: 'Login' }); 
    } else {
      next();
    }
  });

export default router;