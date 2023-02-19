/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, isFunction, isNil, isString } from '@/utils'
import { Method, RouteParamtypes, ModuleMetadata, MetadataKey } from './types/enums'

/**
 *
 * @param type
 * @returns
 */
export const Type = (type: any): (target: Core.Constructor<any>) => void => Reflect.metadata(MetadataKey.TYPE_METADATA, type)
export const ParamTypes = (...type: any): (target: Core.Constructor<any>) => void => Reflect.metadata(MetadataKey.PARAMTYPES_METADATA, type)
export const ReturnType = (type: any): (target: Core.Constructor<any>) => void => Reflect.metadata(MetadataKey.RETURNTYPE_METADATA, type)

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
  inject (token: Core.Constructor<any>): Core.Constructor<any> {
    return this.providers.get(token)?.useClass as Core.Constructor<any>
  }
}

/**
 * @module CreateModule
 * @param { Core.Constructor<T> } Core.Constructor<T>
 * @returns { T } Function
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 */
export const CreateModule = <T>(target: Core.Constructor<T>): T => {
  const modules: Array<Core.Constructor<any>> = Reflect.getMetadata(MetadataKey.PARAMTYPES_METADATA, target)
  return new target(...modules.map(constructor => Factory(constructor)))
}

/**
 * @module Factory
 * @param { Constructor<T> }
 * @returns { T }
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 */
export const Factory = <T>(target: Core.Constructor<T>): T => {
  const providers: Array<Core.Constructor<any>> = Reflect.getMetadata(ModuleMetadata.PROVIDERS, target)
  const continer = new Container()
  try {
    providers.forEach((provide: any) => {
      const hasInject = Reflect.getMetadata(MetadataKey.INJECTABLE_WATERMARK, provide)
      if (!hasInject) throw new Error(`Please use @Injectable() ${provide.name as string}`)
      continer.addProvider({ provide, useClass: provide })
    })
  } catch (error) {
    console.log(error)
  }
  const registerDeepClass = (providers: Array<Core.Constructor<any>>): Array<Core.Constructor<any>> => {
    return providers.map((provider: any) => {
      const currentNeedPro: Core.Constructor<any> = continer.inject(provider)
      const deepNeedProviders = Reflect.getMetadata(MetadataKey.PARAMTYPES_METADATA, provider)
      return !deepNeedProviders ? new currentNeedPro() : new currentNeedPro(...registerDeepClass(deepNeedProviders))
    })
  }
  const controllers: Array<Core.Constructor<any>> = (Reflect.getMetadata(ModuleMetadata.CONTROLLERS, target) as Array<Core.Constructor<any>>).map((controller, index) => {
    const currNeedProviders = Reflect.getMetadata(MetadataKey.PARAMTYPES_METADATA, controller)
    return new controller(...registerDeepClass(currNeedProviders))
  })
  return new target(...controllers)
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
export const Request = (): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(MetadataKey.REQUEST_SERVICE, true, target)
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
    const data: Record<string, any> = Reflect.getMetadata(MetadataKey.ROUTE_ARGS_METADATA, target.constructor, propertyName) || {}
    descriptor.value = function (...args: any[]) {
      const values: Core.RouteParamMetadata[] = Object.values(data)
      if (values.length) {
        return method.apply(this, values.sort((a, b) => a.index - b.index).map(value => {
          const item = args.find((_, index) => index === value.index)
          if (value.pipe?.length) {
            value.pipe.forEach((target, index) => {
              const pipe = isFunction(target) ? new (target as Core.Constructor<any>)() : target
              item[value.data as string] = pipe.constructor.name === 'DefaultValuePipe' ? item[value.data as string] || pipe.defaultValue : pipe.transform(item[value.data as string])
            })
          }
          return item[value.data as string] || item
        }))
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
export const assignMetadata = <TParamtype = any, TArgs = any> (args: TArgs, paramtype: TParamtype, index: number, data?: any, pipe?: Array<Core.Constructor<any> | Object>): Record<string, any> => {
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
export const createParamDecorator = (paramtype: RouteParamtypes) => (data?: any, pipe?: Array<Core.Constructor<any> | Object>): ParameterDecorator => (target, key, index): void => {
  const args = Reflect.getMetadata(MetadataKey.ROUTE_ARGS_METADATA, target.constructor, key) || {}
  const hasParamData = isNil(data) || isString(data)
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
export const Param = (property?: string, ...pipe: Array<Core.Constructor<any> | Object>): ParameterDecorator => createParamDecorator(RouteParamtypes.PARAM)(property, pipe)

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
        Reflect.defineMetadata(property, metadata[property as keyof Core.ModuleMetadata], target)
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
export const RequestMapping = (path: string, method: Method): MethodDecorator => {
  return function (target, key, descriptor: PropertyDescriptor) {
    const fn: (params: any) => any = descriptor.value
    descriptor.value = function (params: any) {
      const hasGet = [Method.GET, Method.get].includes(method)
      const data = { [hasGet ? 'params' : 'data']: params || {} }
      const reqJson: AxiosRequestConfig = {
        url: `${(target as Record<'prifix', string>).prifix}${path.replace(/^\//g, '')}`,
        method,
        ...data
      }
      return fn.apply(this, [reqJson])
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
export const Get = (path: string): MethodDecorator => RequestMapping(path, Method.GET)

/**
 * @module Request
 * @method Post
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export const Post = (path: string): MethodDecorator => RequestMapping(path, Method.POST)

/**
 * @module Request
 * @method Delete
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export const Delete = (path: string): MethodDecorator => RequestMapping(path, Method.DELETE)

/**
 * @module Request
 * @method Put
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export const Put = (path: string): MethodDecorator => RequestMapping(path, Method.PUT)

/**
 * @module UseGuards
 * @method AuthGuard
 * @param { string[] }
 * @auther kaichao.feng
 * @description 请求路由鉴权守卫
 */
export const AuthGuard = (exclude: string[]): MethodDecorator => {
  return function (target, key, descriptor: PropertyDescriptor): void {
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function (...args: any) {
      const hasAuth = exclude.every(item => !new RegExp(`${item}$`).test(args[0].url)) && !getToken()
      if (hasAuth) {
        ElMessage.error('请提供身份令牌')
        throw new Error('Please provide a token')
      }
      const result = fn.apply(this, args)
      return result
    }
  }
}

/**
 * @module Catch
 * @method CatchError
 * @auther kaichao.feng
 * @description TryCatch异常捕获
 */
export const CatchError = (): MethodDecorator => {
  return function (target, key, descriptor: PropertyDescriptor): void {
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function (...args: any) {
      try {
        const result = fn.apply(this, args)
        return result
      } catch (error: any) {
        console.log(`CatchError: ${error}`)
      }
    }
  }
}

/**
 * @module Pipe
 * @method ParseIntPipe
 * @auther kaichao.feng
 * @description 字符串转化为整数
 */
export class ParseIntPipe {
  transform (integer: any): number {
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
  constructor (defaultValue: any) {
    Object.assign(this, { defaultValue })
  }
}
