/* eslint-disable @typescript-eslint/no-dupe-class-members */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-types */
import { isFunction } from '@/utils'
import { ModuleMetadata, MetadataKey } from './types/enums'
import { deepRegisterModulesAllProvider } from './helper'
export * from './decorators'

/**
 * @module Container
 * @class Container
 * @param { ClassProvider<T> }
 * @auther kaichao.feng
 * @description 依赖容器
 */
class Container {
  providers = new Map<Core.Constructor<any>, Core.ClassProvider<any>>()
  /**
   * 注册
   */
  addProvider<T>(provider: Core.ClassProvider<T>): void {
    this.providers.set(provider.provide, provider)
  }

  /**
   * 获取
   */
  inject(token: Core.Constructor<any>): Core.Constructor<any> {
    return this.providers.get(token)?.useClass as Core.Constructor<any>
  }
}

type SuperServicesApplication<T = any> = SuperFactoryStatic & T

/**
 * @publicApi
 */
export class SuperFactoryStatic {
  private globalModule!: Array<Core.Constructor<any>>

  private globalCatchCallback!: (...args: any[]) => any

  private globalPrefix = ''

  private globalInterceptors: Function[] = []

  create<T>(target: Core.Constructor<T>): SuperServicesApplication<T> {
    const imports: Array<Core.Constructor<any>> =
      Reflect.getMetadata(ModuleMetadata.IMPORTS, target) ?? []
    const deepGlobalModule = (
      modules: Array<Core.Constructor<any>>
    ): Array<Core.Constructor<any>> => {
      // return modules.reduce((prev: Array<Core.Constructor<any>>, target) => {
      //   const isGlobal = Reflect.getMetadata(MetadataKey.GLOBAL, target)
      //   if (isGlobal) {
      //     const isDeepModule: Array<Core.Constructor<any>> =
      //       Reflect.getMetadata(ModuleMetadata.IMPORTS, target) || []
      //     return isDeepModule.length
      //       ? [...prev, target, ...deepGlobalModule(isDeepModule)]
      //       : [...prev, target]
      //   }
      //   return prev
      // }, [])
      const globalModules = Array.from(
        new Set(
          modules.filter(constructor =>
            Reflect.getMetadata(MetadataKey.GLOBAL, constructor)
          )
        )
      )
      const deepModules = globalModules.flatMap(constructor => {
        const deepModuleImports =
          Reflect.getMetadata(ModuleMetadata.IMPORTS, constructor) || []
        return deepModuleImports.length
          ? [constructor, ...deepGlobalModule(deepModuleImports)]
          : [constructor]
      })
      return [...globalModules, ...deepModules]
    }
    this.globalModule = Array.from(new Set(deepGlobalModule(imports)))
    return <SuperServicesApplication<T>>(<unknown>Object.assign(
      <Object>Factory(target),
      {
        ...this,
        setGlobalCatchCallback: this.setGlobalCatchCallback.bind(this),
        setGlobalPrefix: this.setGlobalPrefix.bind(this),
        useInterceptors: this.useInterceptors.bind(this)
      }
    ))
  }

  /**
   *
   *
   * @param {(error: any) => any} catchCallback
   * @memberof SuperFactoryStatic
   * @description set global error callback
   */
  public setGlobalCatchCallback(catchCallback: (error: any) => any) {
    this.globalCatchCallback = catchCallback
  }

  /**
   *
   * @param { string } prefix
   * @memberof SuperFactoryStatic
   * @description set global request prefix
   */
  public setGlobalPrefix(prefix: string) {
    this.globalPrefix = prefix ? prefix.replace(/^\//g, '') + '/' : ''
  }

  /**
   *
   * @param { Array<Function> } prefix
   * @memberof SuperFactoryStatic
   * @description set global request interceptors
   */
  public useInterceptors(...interceptors: Function[]) {
    this.globalInterceptors = interceptors
  }
}

/**
 * @module SupportFactory
 * @param { Core.Constructor<T> } Core.Constructor<T>
 * @returns { T } Function
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 * */
export const SuperFactory = new SuperFactoryStatic()

/**
 * @module Factory
 * @param { Constructor<T> }
 * @returns { T }
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 */
export const Factory = <T>(target: Core.Constructor<T>): T => {
  const modules = new Set<Core.Constructor<any>>([
    ...(Reflect.getMetadata(ModuleMetadata.IMPORTS, target) ?? []),
    ...((<any>SuperFactory).globalModule || [])
  ])
  const providers =
    new Set<Core.Constructor<any>>(
      Reflect.getMetadata(ModuleMetadata.PROVIDERS, target)
    ) ?? []
  const paramtypes: Array<Core.Constructor<any>> =
    Reflect.getMetadata(MetadataKey.PARAMTYPES_METADATA, target) ?? []
  const deepAllProvider = Array.from(
    new Set(deepRegisterModulesAllProvider(Array.from(modules)))
  )
  deepAllProvider.forEach(target => providers.add(target))
  Reflect.defineMetadata(ModuleMetadata.PROVIDERS, deepAllProvider, target)
  const container = new Container()
  try {
    Array.from(providers).forEach((provide: any) => {
      const isInject = Reflect.getMetadata(
        MetadataKey.INJECTABLE_WATERMARK,
        provide
      )
      const isFactoryProvide = isFunction(provide)
      if (!isInject && isFactoryProvide)
        throw new Error(`Please use @Injectable() ${provide.name as string}`)
      container.addProvider({
        provide: isFactoryProvide ? provide : provide.provide,
        useClass: isFactoryProvide
          ? provide
          : provide?.useFactory?.() ?? provide.useValue
      })
    })
  } catch (error) {
    console.log(error)
  }
  try {
    const registerDeepClass = (
      providers: Array<Core.Constructor<any>>
    ): Array<Core.Constructor<any>> => {
      return (
        providers?.map((provider: any) => {
          const currentNeedPro: Core.Constructor<any> =
            container.inject(provider)
          if (!currentNeedPro) {
            throw new Error(
              `Please use exports Service ${provider.name as string}`
            )
          }
          const deepNeedProviders = Reflect.getMetadata(
            MetadataKey.PARAMTYPES_METADATA,
            provider
          )
          const isFactoryProvide = isFunction(currentNeedPro)
          return !deepNeedProviders
            ? isFactoryProvide
              ? new currentNeedPro()
              : currentNeedPro
            : new currentNeedPro(...registerDeepClass(deepNeedProviders))
        }) ?? []
      )
    }
    const params: Array<Core.Constructor<any>> = paramtypes.map(target => {
      const currNeedProviders = Reflect.getMetadata(
        MetadataKey.PARAMTYPES_METADATA,
        target
      )
      if (
        !container.inject(target) &&
        Reflect.getMetadata(MetadataKey.INJECTABLE_WATERMARK, target)
      ) {
        throw new Error(`Please use exports Service ${target.name}`)
      }
      return new target(...registerDeepClass(currNeedProviders))
    })
    return new target(...params)
  } catch (error) {
    console.log(error)
    return new target()
  }
}
