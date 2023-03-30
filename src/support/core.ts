/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { validateSync, ValidationError } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { isArray, isFunction, isString } from '@/utils'
import {
  Method,
  RouteParamtypes,
  ModuleMetadata,
  MetadataKey
} from './types/enums'

/**
 *
 * @param type
 * @returns
 */
export const Type = (type: any): ((target: Core.Constructor<any>) => void) =>
  Reflect.metadata(MetadataKey.TYPE_METADATA, type)
export const ParamTypes = (
  ...type: any
): ((target: Core.Constructor<any>) => void) =>
  Reflect.metadata(MetadataKey.PARAMTYPES_METADATA, type)
export const ReturnType = (
  type: any
): ((target: Core.Constructor<any>) => void) =>
  Reflect.metadata(MetadataKey.RETURNTYPE_METADATA, type)

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

export const applyDecorators = (...decorators: Function[]): MethodDecorator => {
  return function (target, key, descriptor: PropertyDescriptor) {
    decorators.forEach(decorator => {
      decorator(target, key, descriptor)
    })
  }
}

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

const deepRegisterModules = (
  modules: Array<Core.Constructor<any>>
): Array<Core.Constructor<any>> => {
  return modules.reduce((prev: Array<Core.Constructor<any>>, constructor) => {
    const modules: Array<Core.Constructor<any>> = getModuleImports(constructor)
    const globalProviders = getGlobalProviders(constructor)
    const providers = deepRegisterModules(
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

/**
 * @publicApi
 */
export class SuperFactoryStatic {
  public globalModule!: Array<Core.Constructor<any>>

  create<T>(target: Core.Constructor<T>): T {
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
    return Factory(target)
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
    ...(SuperFactory.globalModule || [])
  ])
  const providers =
    new Set<Core.Constructor<any>>(
      Reflect.getMetadata(ModuleMetadata.PROVIDERS, target)
    ) ?? []
  const paramtypes: Array<Core.Constructor<any>> =
    Reflect.getMetadata(MetadataKey.PARAMTYPES_METADATA, target) ?? []
  deepRegisterModules(Array.from(modules)).forEach(target =>
    providers.add(target)
  )
  const container = new Container()
  try {
    Array.from(providers).forEach((provide: any) => {
      const isInject = Reflect.getMetadata(
        MetadataKey.INJECTABLE_WATERMARK,
        provide
      )
      if (!isInject)
        throw new Error(`Please use @Injectable() ${provide.name as string}`)
      container.addProvider({ provide, useClass: provide })
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
          return !deepNeedProviders
            ? new currentNeedPro()
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

/**
 * @module Injectable
 * @auther kaichao.feng
 * @description 标注依赖注入
 */
export const Injectable = (): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(MetadataKey.INJECTABLE_WATERMARK, true, target)
  }
}

/**
 * @module Request
 * @auther kaichao.feng
 * @description 标注是否为请求依赖
 */
export const Request = (): ClassDecorator => (target: object) =>
  Reflect.defineMetadata(MetadataKey.REQUEST_SERVICE, true, target)

export const Injection = (...args: any) => {
  return function (target: any, propertyName: string) {
    const registerDeepClass = (
      providers: Array<Core.Constructor<any>>
    ): Array<Core.Constructor<any>> => {
      try {
        return (
          providers?.map((provider: any) => {
            const isInject = Reflect.getMetadata(
              MetadataKey.INJECTABLE_WATERMARK,
              provider
            )
            if (!isInject)
              throw new Error(
                `Please use @Injectable() ${provider.name as string}`
              )
            const deepNeedProviders = Reflect.getMetadata(
              MetadataKey.PARAMTYPES_METADATA,
              provider
            )
            return !deepNeedProviders
              ? new provider()
              : new provider(...registerDeepClass(deepNeedProviders))
          }) ?? []
        )
      } catch (error) {
        console.log(error)
        return []
      }
    }
    const propertyValue = Reflect.getMetadata(
      MetadataKey.TYPE_METADATA,
      target,
      propertyName
    )
    target[propertyName] =
      propertyValue && registerDeepClass([propertyValue])[0]
  }
}

/**
 * @module Inject
 * @auther kaichao.feng
 * @description 具名依赖注入 搭配Param使用
 */
export const Inject = (): MethodDecorator => {
  return function (target, propertyName, descriptor: PropertyDescriptor) {
    const method: (...params: any[]) => any = descriptor.value
    const data: Record<string, any> =
      Reflect.getMetadata(
        MetadataKey.ROUTE_ARGS_METADATA,
        target.constructor,
        propertyName
      ) || {}
    descriptor.value = function (...args: any[]) {
      const values: Core.RouteParamMetadata[] = (
        Object.values(data) || []
      ).sort((a, b) => a.index - b.index)
      if (values.length) {
        return method.apply(
          this,
          args.map((param, index) => {
            const item = values.find(_ => _.index === index)
            if (item?.data) {
              const registerClasses = item?.pipe?.map((target: any) =>
                isFunction(target)
                  ? new (target as Core.Constructor<any>)()
                  : target
              )
              if (isArray(item.data)) {
                return (<string[]>item.data).reduce((prev, next) => {
                  const paramObj = <Record<string, any>>{}
                  if (registerClasses?.length) {
                    registerClasses?.forEach(target => {
                      paramObj[next] =
                        target.constructor.name === 'DefaultValuePipe'
                          ? param[next] || target.defaultValue
                          : target.transform(paramObj[next])
                    })
                  } else {
                    paramObj[next] = param[next]
                  }
                  return { ...prev, ...paramObj }
                }, {})
              }
              registerClasses?.forEach(target => {
                param[item.data as string] =
                  target.constructor.name === 'DefaultValuePipe'
                    ? param[item.data as string] || target.defaultValue
                    : target.transform(param[item.data as string])
              })
              return param[item.data as string]
            }
            return param
          })
        )
      }
      return method.apply(this, args)
    }
  }
}

/**
 * @module assignMetadata
 * @auther kaichao.feng
 * @returns { Record<string, any> } Record<string, any>
 */
export const assignMetadata = <TParamtype = any, TArgs = any>(
  args: TArgs,
  paramtype: TParamtype,
  index: number,
  data?: any,
  pipe?: Array<Core.Constructor<any> | Object>
): Record<string, any> => {
  return {
    ...args,
    [`${paramtype}:${index}`]: {
      index,
      data,
      pipe
    }
  }
}

/**
 * @method createParamDecorator
 * @auther kaichao.feng
 * @description this is @Param Helper Function
 */
export const createParamDecorator =
  (paramtype: RouteParamtypes) =>
  (
    data?: any,
    pipe?: Array<Core.Constructor<any> | Object>
  ): ParameterDecorator =>
  (target, key, index): void => {
    const args =
      Reflect.getMetadata(
        MetadataKey.ROUTE_ARGS_METADATA,
        target.constructor,
        key
      ) || {}
    const hasParamData = isString(data) || isArray(data)
    const paramData = hasParamData ? data : undefined
    Reflect.defineMetadata(
      MetadataKey.ROUTE_ARGS_METADATA,
      assignMetadata(args, paramtype, index, paramData, pipe),
      target.constructor,
      key
    )
  }

/**
 * @method Param
 * @auther kaichao.feng
 * @description 搭配Inject使用，Param传递的property会通过Inject读取原始参数并返回指定的key对应的value，并返回到当前装饰器形参位置
 */
export const Param = (
  property?: string | string[],
  ...pipe: Array<Core.Constructor<any> | Object>
): ParameterDecorator =>
  createParamDecorator(RouteParamtypes.PARAM)(property, pipe)

/**
 * @module Global
 * @auther kaichao.feng
 * @description 全局模块
 */
export const Global = () => {
  return (target: Core.Constructor<any>) => {
    Reflect.defineMetadata(MetadataKey.GLOBAL, true, target)
  }
}

/**
 * @module Module
 * @param { ModuleMetadata }
 * @auther kaichao.feng
 * @description 模块管理函数
 */
export const Module = (metadata: Core.ModuleMetadata): ClassDecorator => {
  // const propsKeys = Object.keys(metadata)
  return (target: any) => {
    for (const property in metadata) {
      if (metadata[property as keyof Core.ModuleMetadata]) {
        Reflect.defineMetadata(
          property,
          metadata[property as keyof Core.ModuleMetadata],
          target
        )
      }
    }
  }
}

/**
 * @module Controller
 * @param { string }
 * @auther kaichao.feng
 * @description Request Controller
 */
export const Controller = (prifix = ''): ClassDecorator => {
  return function (target: any) {
    target.prototype.prifix = prifix ? prifix.replace(/^\//g, '') + '/' : ''
  }
}

/**
 * @module RequestFactory
 * @method RequestMapping
 * @param { string }
 * @auther kaichao.feng
 * @returns { MethodDecorator } MethodDecorator
 * @description Request Factory
 */
export const RequestMapping = (
  path: string,
  method: Method
): MethodDecorator => {
  return function (target, key, descriptor: PropertyDescriptor) {
    const fn: (params: any) => any = descriptor.value
    const DTO = Reflect.getMetadata(
      MetadataKey.PARAMTYPES_METADATA,
      target,
      key
    )
    descriptor.value = function (params: any) {
      const handelParam = (): AxiosRequestConfig => {
        const hasGet = [Method.GET, Method.get].includes(method)
        const requestURL = `${
          (target as Record<'prifix', string>).prifix
        }${path.replace(/^\//g, '')}`
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [prifixUrl, ...paramList] = requestURL.split('/:')
        const data = { [hasGet ? 'params' : 'data']: params }
        const url = paramList
          .reduce(
            (prev, next) => prev.replace(new RegExp(next), params[next]),
            requestURL
          )
          .replace(/:/g, '')
        const reqJson: AxiosRequestConfig = {
          url,
          method,
          ...(paramList.length ? {} : data)
        }
        return reqJson
      }
      if (DTO[0].name !== 'Object') {
        const errors = validateSync(plainToInstance(DTO[0], params))
        if (errors.length) {
          const deepError = (errors: ValidationError[]): any[] => {
            return errors.map(error => {
              if (error.children?.length) return deepError(error.children)
              return Object.values(
                <{ [type: string]: string }>error.constraints
              )
            })
          }
          const deepReduce = (arr: any[]): any[] => {
            return arr.reduce(
              (prev, next) =>
                Array.isArray(next)
                  ? [...prev, ...deepReduce(next)]
                  : [...prev, next],
              []
            )
          }
          const messages = deepReduce(deepError(errors))
          ElMessage.error({
            dangerouslyUseHTMLString: true,
            message: messages.map(message => `${message}<br/>`).join(''),
            duration: 5 * 1000
          })
          return fn.apply(this, [handelParam()])
        }
        return fn.apply(this, [handelParam()])
      }
      return fn.apply(this, [handelParam()])
    }
  }
}

/**
 * @module Request
 * @method Get
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export const Get = (path: string): MethodDecorator =>
  RequestMapping(path, Method.GET)

/**
 * @module Request
 * @method Post
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export const Post = (path: string): MethodDecorator =>
  RequestMapping(path, Method.POST)

/**
 * @module Request
 * @method Delete
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export const Delete = (path: string): MethodDecorator =>
  RequestMapping(path, Method.DELETE)

/**
 * @module Request
 * @method Put
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export const Put = (path: string): MethodDecorator =>
  RequestMapping(path, Method.PUT)

/**
 * @module Pipe
 * @method ParseIntPipe
 * @auther kaichao.feng
 * @description 字符串转化为整数
 */
export class ParseIntPipe {
  transform(integer: any): number {
    return /^\d+$/g.test(integer) ? parseInt(integer) : integer
  }
}

/**
 * @module Pipe
 * @method DefaultValuePipe
 * @auther kaichao.feng
 * @description 参数绑定默认值
 */
export class DefaultValuePipe {
  defaultValue!: any
  constructor(defaultValue: any) {
    Object.assign(this, { defaultValue })
  }
}
