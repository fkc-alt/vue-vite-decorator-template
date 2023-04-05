import { MetadataKey, ModuleMetadata } from '../types/enums'

const getGlobalProviders = (constructor: Core.Constructor<any>) => {
  const isGlobalModule = Reflect.getMetadata(MetadataKey.GLOBAL, constructor)
  return isGlobalModule
    ? Reflect.getMetadata(ModuleMetadata.PROVIDERS, constructor) ?? []
    : []
}

const getExports = (constructor: Core.Constructor<any>) => {
  return Reflect.getMetadata(ModuleMetadata.EXPORTS, constructor) ?? []
}

const getModuleImports = (constructor: Core.Constructor<any>) => {
  return Reflect.getMetadata(ModuleMetadata.IMPORTS, constructor) ?? []
}

const getProviderReduce = (modules: Array<Core.Constructor<any>>) => {
  return modules
    .filter(
      constructor => !Reflect.getMetadata(MetadataKey.GLOBAL, constructor)
    )
    .reduce((prev: Array<Core.Constructor<any>>, constructor) => {
      return [
        ...prev,
        ...(Reflect.getMetadata(ModuleMetadata.EXPORTS, constructor) ?? [])
      ]
    }, [])
}

export const deepRegisterModulesAllProvider = (
  modules: Array<Core.Constructor<any>>
): Array<Core.Constructor<any>> => {
  return modules.reduce((prev: Array<Core.Constructor<any>>, constructor) => {
    const modules: Array<Core.Constructor<any>> = getModuleImports(constructor)
    const globalProviders = getGlobalProviders(constructor)
    const providers = deepRegisterModulesAllProvider(
      modules.filter(constructor =>
        Reflect.getMetadata(MetadataKey.GLOBAL, constructor)
      )
    )
    const exports = getExports(constructor)
    const providerReduce = getProviderReduce(modules)
    return [
      ...prev,
      ...providers,
      ...exports,
      ...globalProviders,
      ...providerReduce
    ]
  }, [])
}
