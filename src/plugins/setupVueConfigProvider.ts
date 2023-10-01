import { App } from 'vue'
import HTTPClient from '@/main'

/**
 * @method setupVueConfigProvider
 * @param Vue
 * @description 挂载Vue原型属性
 */
export const setupVueConfigProvider = (Vue: App): void => {
  Vue.config.globalProperties.HTTPClient = HTTPClient
}
