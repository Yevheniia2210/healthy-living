
import { createRouter, createWebHistory } from 'vue-router'

const EmptyPage = {
    template: '<div></div>'
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: EmptyPage
    },
    {
        path: '/articles',
        name: 'articles',
        component: EmptyPage
    },
    {
        path: '/articles/:id',
        name: 'article',
        component: EmptyPage
    },
    {
        path: '/admin',
        name: 'admin',
        component: EmptyPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
