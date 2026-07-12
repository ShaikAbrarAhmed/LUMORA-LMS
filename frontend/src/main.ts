import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';

// Initialize the Vue application instance
const app = createApp(App);
const pinia = createPinia();

// Register global stores, router, and mount root component
app.use(pinia);
app.use(router);
app.mount('#app');

