import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { themeChange } from 'theme-change';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(VueQueryPlugin);

app.mount('#app');

themeChange(false);
