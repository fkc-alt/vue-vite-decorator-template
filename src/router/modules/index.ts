/**
 * @description “globEager”已弃用
 */
const modulesFiles: Common.Glob = import.meta.glob('/src/router/modules/**/*.ts', { import: 'default', eager: true })

const routesSort = (routes: Array<import('vue-router').RouteRecordRaw>): void => {
  routes.sort((a, b) => a.sort && b.sort ? a.sort - b.sort : -1)
  routes.forEach(route => !!route.children?.length && routesSort(route.children))
}

const modules = Object.values(modulesFiles).reduce((prev, next) => [...prev, ...next])

routesSort(modules)

export default modules
