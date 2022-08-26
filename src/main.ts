import { createApp } from 'vue';
import { createPinia } from "pinia";
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

import router from '@/router';
import i18n from '@/locales/i18n';

import App from './App.vue';


import '@/assets/reset.css';
import "@/permission";

const pinia = createPinia();

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia).use(router).use(ElementPlus).use(i18n).mount('#app');

app.config.globalProperties.$axios = 1;
