import * as path from 'path'
import type { Plugin, ResolvedConfig } from 'vite'

export default function fullImportPlugin (): Plugin {
  let config: ResolvedConfig
  return {
    name: 'fullImportElementPlus',
    async configResolved (conf) {
      config = conf
    },
    transform (code, id) {
      // 判断当前处理的是否是 _src/main.ts_
      if (path.join(config.root, 'src/main.ts') === id) {
        const name = 'ElementPlus'
        // 引入 ElementPlus 和 样式
        const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/theme-chalk/src/index.scss';\n`
        code = code.replace('.mount(', ($1) => `.use(${name})` + $1)
        return prepend + code
      }
      return code
    }
  }
}
