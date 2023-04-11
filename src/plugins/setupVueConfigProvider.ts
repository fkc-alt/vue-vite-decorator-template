import { App } from 'vue'
import { application } from '@/service/main'

/**
 * @method setupVueConfigProvider
 * @param Vue
 * @description 挂载Vue原型属性
 */
export const setupVueConfigProvider = (Vue: App): void => {
  Vue.config.globalProperties.application = application
}
