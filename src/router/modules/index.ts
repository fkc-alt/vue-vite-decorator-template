/**
 * @description “globEager”已弃用
 */
const modulesFiles: Common.Glob = import.meta.glob('/src/router/modules/**/*.ts', { import: 'default', eager: true })

const modules = Object.values(modulesFiles).reduce((prev, next) => [...prev, ...next])

export default modules
