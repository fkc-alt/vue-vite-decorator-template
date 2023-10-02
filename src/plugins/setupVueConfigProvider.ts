import { App } from 'vue'

/**
 * @method setupVueConfigProvider
 * @param Vue
 * @description 挂载Vue原型属性
 */
export const setupVueConfigProvider = (
  Vue: App,
  HTTPClient: import('@/client/app.module').AppModule
): void => {
  Vue.config.globalProperties.HTTPClient = HTTPClient
}
