import { MetadataKey, ModuleMetadata } from '../types/enums'

export const isGlobalModule = (constructor: Core.Constructor<any>): boolean => {
  return !!Reflect.getMetadata(MetadataKey.GLOBAL, constructor)
}

/**
 *
 * @param { Core.Constructor<any> } constructor
 * @author kaichao.feng
 * @description Get Global Module Providers
 * @returns { Array<Core.Constructor<any>>  } providers
 */
export const getGlobalProviders = (
  constructor: Core.Constructor<any>
): Array<Core.Constructor<any>> => {
  return isGlobalModule(constructor)
    ? Reflect.getMetadata(ModuleMetadata.PROVIDERS, constructor) ?? []
    : []
}

/**
 *
 * @param { Core.Constructor<any> } constructor
 * @author kaichao.feng
 * @description Get the provider for the module
 * @returns { Array<Core.Constructor<any>>  } providers
 */
export const getExports = (
  constructor: Core.Constructor<any>
): Array<Core.Constructor<any>> => {
  return Reflect.getMetadata(ModuleMetadata.EXPORTS, constructor) ?? []
}

/**
 *
 * @param { Core.Constructor<any> } constructor
 * @author kaichao.feng
 * @description Get the controller for the module
 * @returns { Array<Core.Constructor<any>>  } controller
 */
export const getControllers = (
  constructor: Core.Constructor<any>
): Array<Core.Constructor<any>> => {
  return Reflect.getMetadata(ModuleMetadata.CONTROLLERS, constructor) ?? []
}

/**
 *
 * @param { Core.Constructor<any> } constructor
 * @author kaichao.feng
 * @description Get the IMPORTS for the module
 * @returns { Array<Core.Constructor<any>>  } providers
 */
export const getModuleImports = (
  constructor: Core.Constructor<any>
): Array<Core.Constructor<any>> => {
  return Reflect.getMetadata(ModuleMetadata.IMPORTS, constructor) ?? []
}

/**
 *
 * @param { Core.Constructor<any> } constructor
 * @author kaichao.feng
 * @description Get providers that are not global modules
 * @returns { Array<Core.Constructor<any>>  } providers
 */
export const getProviderReduce = (modules: Array<Core.Constructor<any>>) => {
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

/**
 *
 * @param { Core.Constructor<any> } constructor
 * @author kaichao.feng
 * @description Recursively obtain providers for all modules
 * @returns { Array<Core.Constructor<any>>  } providers
 */
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
