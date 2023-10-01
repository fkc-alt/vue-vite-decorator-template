import 'reflect-metadata'
import 'virtual:svg-icons-register'
import { setupGlobalProvider } from '@/plugins/setupGlobalProvider'
import { setupVueConfigProvider } from '@/plugins/setupVueConfigProvider'
import router from '@/router'
import i18n from '@/locales/i18n'
import '@/router/permission'
import useIcons from '@/hooks/useIcons'
import createHTTPClient from '@/client/main'
import App from './App'

const pinia = createPinia()

const bootstrap = () => {
  const app = createApp(App)
  app.use(pinia).use(router).use(useIcons).use(i18n)
  router
    .isReady()
    .then(() => {
      setupGlobalProvider()
      setupVueConfigProvider(app)
      app.mount('#app')
      const { AppLogger } = provider.inject
      AppLogger(_APP_INFO_)
    })
    .catch(console.error)
  return createHTTPClient()
}
export default bootstrap()
