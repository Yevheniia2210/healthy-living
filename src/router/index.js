
// EN: Import Vue Router to manage navigation between pages.
// RU: Импортируем Vue Router для управления переходами между страницами.
import { createRouter, createWebHistory } from 'vue-router'

// EN: Import the four page components of the website.
// RU: Импортируем четыре компонента страниц сайта.
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import AdminView from '../views/AdminView.vue'

// EN: Define the routes and connect each URL to its page.
// RU: Определяем маршруты и связываем каждый адрес с его страницей.
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
