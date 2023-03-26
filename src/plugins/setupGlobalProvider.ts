const modulesFiles = import.meta.glob('/src/provider/*.ts', {
  eager: true
}) as unknown as CustomProvider.Provider

const convertSymbolToNormalStr = (
  obj: Pick<CustomProvider.Provider, 'inject' | 'test'>
): Partial<CustomProvider.Provider> => {
  return Reflect.ownKeys(obj).reduce((total, key) => {
    if (typeof key === 'string') {
      return Object.assign(total, { [key]: obj[key as keyof typeof obj] })
    }
    return total
  }, {})
}

const provider = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\/src\/provider\/(.*)\.\w+$/, '$1')
  const scope = {
    [moduleName]: convertSymbolToNormalStr(modulesFiles[modulePath])
  }
  return Object.assign(modules, scope)
}, {}) as CustomProvider.Provider

/**
 * @method setupGlobalProvider
 * @description 全局挂载属性方法,使用的时候只需 provider.[provider文件夹下的文件名].[文件里面的(方法 | 变量)]
 */
export const setupGlobalProvider = (): void => {
  window.provider = provider
}

export default provider
