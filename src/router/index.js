
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/articles',
        name: 'articles',
        component: ArticlesView
    },
    {
        path: '/articles/:id',
        name: 'article',
        component: ArticleDetailView
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
