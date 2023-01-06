const modulesFiles = import.meta.glob('/src/provider/*.ts', { eager: true }) as unknown as CostomProvider.Provider

const convertSymbolToNormalStr = (obj: Pick<CostomProvider.Provider, 'inject' | 'test'>): Partial<CostomProvider.Provider> => {
  return Reflect.ownKeys(obj).reduce((total, key) => {
    if (typeof key === 'string') {
      return Object.assign(total, { [key]: obj[key as keyof(typeof obj)] })
    }
    return total
  }, {})
}

const provider = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\/src\/provider\/(.*)\.\w+$/, '$1')
  const scope = { [moduleName]: convertSymbolToNormalStr(modulesFiles[modulePath]) }
  return Object.assign(modules, scope)
}, {}) as CostomProvider.Provider

export const setupProvider = (): void => {
  window.provider = provider
}

export default provider
