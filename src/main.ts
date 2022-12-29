import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import router from '@/router'
import i18n from '@/locales/i18n'
import useIcons from './hooks/useIcons'

import App from './App'

import '@/assets/reset.css'
import '@/router/permission'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia).use(router).use(useIcons).use(i18n)
router.isReady().then(() => {
  app.mount('#app')
  getAppInfo(_APP_INFO_)
}).catch(err => console.error(err))
