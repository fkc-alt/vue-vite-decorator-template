/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

const modulesFiles: Record<string, any> = import.meta.glob('/provider/*.ts', { eager: true })
console.log(modulesFiles, 'modulesFiles')
const modules: Record<string, any> = Object.keys(modulesFiles).reduce((modules: Record<string, any>, modulePath: string) => {
  const moduleName = (modulePath.replace(/^\/provider\/(.*)\.\w+$/, '$1'))
  modules = { ...modules, ...{ [moduleName]: modulesFiles[modulePath] } }
  return modules
}, {})

export default modules
