import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Initialize the Vue application instance
const app = createApp(App);
const pinia = createPinia();

// Register global stores and mount root component
app.use(pinia);
app.mount('#app');
