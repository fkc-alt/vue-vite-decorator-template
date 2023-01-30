import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import 'reflect-metadata'
import { setupProvider } from '@/plugins/setupProvider'
import router from '@/router'
import i18n from '@/locales/i18n'
import useIcons from './hooks/useIcons'
import App from './App'
import Demo from '@/descriptors/demo'
import '@/assets/reset.css'
import '@/router/permission'

const pinia = createPinia()

const bootstrap = (): void => {
  const app = createApp(App)
  app.use(pinia).use(router).use(useIcons).use(i18n)
  router.isReady().then(() => {
    /**
     * @description 全局挂载属性方法,使用的时候只需 provider.[provider文件夹下的文件名].[文件里面的(方法 | 变量)]
     */
    setupProvider()
    app.mount('#app')
    const { AppLogger } = provider.inject
    AppLogger(_APP_INFO_)
  }).catch(err => console.error(err))
}

Demo.Log()

bootstrap()
