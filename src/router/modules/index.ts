/**
 * @description “globEager”已弃用
 */
const modulesFiles: Common.Glob = import.meta.glob('/src/router/modules/**/*.ts', { import: 'default', eager: true })

const routesSort = (routes: Array<import('vue-router').RouteRecordRaw>): void => {
  routes.sort((a, b) => (a.sort != null) && (b.sort != null) ? a.sort - b.sort : -1)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  routes.forEach(route => !!route.children?.length && routesSort(route.children))
}

const modules = Object.values(modulesFiles).reduce((prev, next) => [...prev, ...next])

routesSort(modules)

export default modules
