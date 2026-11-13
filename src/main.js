
// EN: Import Vue, CSS, the main component and Vue Router.
// RU: Импортируем Vue, CSS, главный компонент и Vue Router.
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// EN: Create the Vue application, connect the router and display the website.
// RU: Создаём Vue-приложение, подключаем маршрутизатор и отображаем сайт.
createApp(App).use(router).mount('#app')
