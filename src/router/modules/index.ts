/**
 * @description “globEager”已弃用
 */
const modulesFiles: Common.Glob = import.meta.glob('/src/router/modules/**/*.ts', { import: 'default', eager: true })

const modules = Object.values(modulesFiles).reduce((prev, next) => {
  prev = [...prev, ...next]
  return prev
}).sort((a, b) => (a.sort != null) && (b.sort != null) ? a.sort - b.sort : -1)

export default modules
