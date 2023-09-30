import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const iconList: string[] = [
  'GoodsFilled',
  'StarFilled',
  'Suitcase',
  'Tickets',
  'Platform',
  'ShoppingCart',
  'Picture',
  'Plus',
  'Delete',
  'Goods',
  'User',
  'List',
  'Wallet',
  'Menu'
]

export default {
  install: (Vue: App) => {
    Object.entries(ElementPlusIconsVue)
      .map(([_key, component]) => component)
      .filter(comp => iconList.includes(comp.name))
      .forEach(comp => {
        Vue.component(comp.name, comp)
      })
  }
}
