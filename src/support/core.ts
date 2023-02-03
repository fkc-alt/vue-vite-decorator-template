/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, isNil, isString } from '@/utils'
import { Method, RouteParamtypes } from './types/enums'
import { MODULE_METADATA, PARAMTYPES_METADATA, INJECTABLE_WATERMARK, REQUEST_SERVICE, ROUTE_ARGS_METADATA } from './constant'

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

export const CreateModule = <T>(target: Core.Constructor<T>): T => {
  const modules: [] = Reflect.getMetadata(PARAMTYPES_METADATA, target)
  return new target(...modules.map(item => Factory(item)))
}

/**
 * @module Factory
 * @param { Constructor<T> }
 * @returns { T }
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 */
export const Factory = <T>(target: Core.Constructor<T>, config: AxiosRequestConfig = { baseURL: import.meta.env.VITE_APP_BASE_API }): T => {
  const providers: Array<Core.Constructor<any>> = Reflect.getMetadata(MODULE_METADATA.PROVIDERS, target)
  const continer = new Container()
  try {
    providers.forEach((provide: any) => {
      const hasInject = Reflect.getMetadata(INJECTABLE_WATERMARK, provide)
      if (!hasInject) throw new Error(`Please use @Injectable() ${provide.name as string}`)
      continer.addProvider({ provide, useClass: provide })
    })
  } catch (error) {
    console.log(error)
  }
  const registerDeepClass = (providers: Array<Core.Constructor<any>>): Array<Core.Constructor<any>> => {
    return providers.map((provider: any) => {
      const currentNeedPro: Core.Constructor<any> = continer.inject(provider)
      const deepNeedProviders = Reflect.getMetadata(PARAMTYPES_METADATA, provider)
      return !deepNeedProviders ? new currentNeedPro() : new currentNeedPro(...registerDeepClass(deepNeedProviders))
    })
  }
  const controllers: Array<Core.Constructor<any>> = (Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, target) as Array<Core.Constructor<any>>).map((controller, index) => {
    const currNeedProviders = Reflect.getMetadata(PARAMTYPES_METADATA, controller)
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
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target)
  }
}

/**
 * @module Request
 * @auther kaichao.feng
 * @description 标注是否为请求依赖
 */
export const Request = (): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(REQUEST_SERVICE, true, target)
  }
}

/**
 * @module Inject
 * @auther kaichao.feng
 * @description 具名依赖注入
 */
export const Inject = (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>): any => {
  const method: (...params: any[]) => any = descriptor.value
  const data: Record<string, any> = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, propertyName) || {}
  descriptor.value = function (...args: any[]) {
    const values = Object.values(data)
    if (values.length) {
      return method.apply(this, values.map(value => {
        const item = args.find((_, index) => index === value.index)
        return item[value.data as unknown as string] || item
      }))
    }
    return method.apply(this, args)
  }
}

export const assignMetadata = <TParamtype = any, TArgs = any> (args: TArgs, paramtype: TParamtype, index: number, data?: any): any => {
  return {
    ...args,
    [`${paramtype}:${index}`]: {
      index,
      data
    }
  }
}

export const createPipesRouteParamDecorator = (paramtype: RouteParamtypes) => (data?: any): ParameterDecorator => (target, key, index) => {
  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {}
  const hasParamData = isNil(data) || isString(data)
  const paramData = hasParamData ? data : undefined
  Reflect.defineMetadata(
    ROUTE_ARGS_METADATA,
    assignMetadata(args, paramtype, index, paramData),
    target.constructor,
    key
  )
}

export function Param (
  property?: string
): ParameterDecorator {
  return createPipesRouteParamDecorator(RouteParamtypes.PARAM)(property)
}

/**
 * @module Module
 * @param { ModuleMetadata }
 * @auther kaichao.feng
 * @description 模块管理函数
 */
export const Module = (metadata: Core.ModuleMetadata) => {
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
 * @description 接口控制器
 */
export const Controller = (prifix = '') => {
  return function (target: any) {
    target.prototype.prifix = prifix ? prifix.replace(/^\//g, '') + '/' : ''
  }
}

export const RequestMapping = (path: string, method: Method): any => {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn: (params: any) => any = descriptor.value
    descriptor.value = function (params: any) {
      Reflect.defineMetadata(ROUTE_ARGS_METADATA, { a: 1 }, target, key)
      const hasGet = [Method.GET, Method.get].includes(method)
      const data = { [hasGet ? 'params' : 'data']: params || {} }
      const reqJson: AxiosRequestConfig = {
        url: `${target.prifix as string}${path.replace(/^\//g, '')}`,
        method,
        ...data
      }
      return fn.apply(this, [reqJson])
    }
  }
}

/**
 * @module Get
 * @param { string }
 * @auther kaichao.feng
 * @description 请求方法
 */
export const Get = (path: string): Function => RequestMapping(path, Method.GET)

/**
 * @module Post
 * @param { string }
 * @auther kaichao.feng
 * @description 请求方法
 */
export const Post = (path: string): Function => RequestMapping(path, Method.POST)

/**
 * @module Delete
 * @param { string }
 * @auther kaichao.feng
 * @description 请求方法
 */
export const Delete = (path: string): Function => RequestMapping(path, Method.DELETE)

/**
 * @module AuthGuard
 * @param { string[] }
 * @auther kaichao.feng
 * @description 请求路由鉴权守卫
 */
export const AuthGuard = (exclude: string[]) => {
  return function (target: object, key: string, descriptor: PropertyDescriptor): void {
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
 * @module CatchError
 * @auther kaichao.feng
 * @description TryCatch异常捕获
 */
export const CatchError = () => {
  return function (target: object, key: string, descriptor: PropertyDescriptor): void {
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function (...args: any) {
      try {
        const result = fn.apply(this, args)
        return result
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`CatchError: ${error}`)
      }
    }
  }
}
