import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const iconList: string[] = ['GoodsFilled', 'Suitcase', 'Tickets', 'Platform']

export default {
  install: (Vue: App) => {
    Object.entries(ElementPlusIconsVue).map(([_key, component]) => component).filter(comp => iconList.includes(comp.name)).forEach(comp => {
      Vue.component(comp.name, comp)
    })
  }
}
