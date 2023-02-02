/* eslint-disable prefer-rest-params */
/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils'
import { MODULE_METADATA, TYPE_METADATA, PARAMTYPES_METADATA, RETURNTYPE_METADATA, INJECTABLE_WATERMARK, REQUEST_SERVICE } from './constant'

interface ModuleMetadata {
  imports?: any[]
  controllers?: Array<Constructor<any>>
  providers?: Array<Constructor<any>>
}

type Constructor<T = any> = new (...args: any[]) => T
interface ClassProvider<T> {
  provide: Constructor<T>
  useClass: Constructor<T>
}

export const Type = (type: any): (target: Function) => void => Reflect.metadata(TYPE_METADATA, type)
export const ParamTypes = (...type: any): (target: Function) => void => Reflect.metadata(PARAMTYPES_METADATA, type)
export const ReturnType = (type: any): (target: Function) => void => Reflect.metadata(RETURNTYPE_METADATA, type)

/**
 * @module Container
 * @class Container
 * @param { ClassProvider<T> }
 * @auther kaichao.feng
 * @description 依赖容器
 */
class Container {
  providers = new Map<Constructor<any>, ClassProvider<any>>()
  /**
   * 注册
   */
  addProvider<T>(provider: ClassProvider<T>): void {
    this.providers.set(provider.provide, provider)
  }

  /**
   * 获取
   */
  inject (token: Constructor<any>): Constructor<any> {
    return this.providers.get(token)?.useClass as Constructor<any>
  }
}

export const CreateModule = <T>(target: Constructor<T>): T => {
  const modules: [] = Reflect.getMetadata(PARAMTYPES_METADATA, target)
  console.log(modules, 'modules')
  return new target(...modules.map(item => Factory(item)))
}

/**
 * @module Factory
 * @param { Constructor<T> }
 * @returns { T }
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 */
export const Factory = <T>(target: Constructor<T>, config: AxiosRequestConfig = { baseURL: import.meta.env.VITE_APP_BASE_API }): T => {
  const providers: Array<Constructor<any>> = Reflect.getMetadata(MODULE_METADATA.PROVIDERS, target)
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
  const registerDeepClass = (providers: Array<Constructor<any>>): Array<Constructor<any>> => {
    return providers.map((provider: any) => {
      const currentNeedPro: Constructor<any> = continer.inject(provider)
      const deepNeedProviders = Reflect.getMetadata(PARAMTYPES_METADATA, provider)
      return !deepNeedProviders ? new currentNeedPro() : new currentNeedPro(...registerDeepClass(deepNeedProviders))
    })
  }
  const controllers: Array<Constructor<any>> = (Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, target) as Array<Constructor<any>>).map((controller, index) => {
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
export const Inject = (target?: Constructor<any>) => {
  return function (...args: any[]) {
    console.log(args, target)
  }
}

/**
 * @module Module
 * @param { ModuleMetadata }
 * @auther kaichao.feng
 * @description 模块管理函数
 */
export const Module = (metadata: ModuleMetadata) => {
  // const propsKeys = Object.keys(metadata)
  return (target: any) => {
    for (const property in metadata) {
      if (metadata[property as keyof ModuleMetadata]) {
        Reflect.defineMetadata(property, metadata[property as keyof ModuleMetadata], target)
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

/**
 * @module Get
 * @param { string }
 * @auther kaichao.feng
 * @description 请求方法
 */
export const Get = (path: string) => {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function () {
      const param: AxiosRequestConfig = Object.assign({
        url: `${target.prifix as string}${path.replace(/^\//g, '')}`,
        method: 'GET'
      }, arguments.length ? { params: arguments[0] } : {})
      const result = fn.apply(this, [param])
      return result
    }
  }
}

/**
 * @module Post
 * @param { string }
 * @auther kaichao.feng
 * @description 请求方法
 */
export const Post = (path: string) => {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function () {
      const param: AxiosRequestConfig = Object.assign({
        url: `${target.prifix as string}${path.replace(/^\//g, '')}`,
        method: 'POST'
      }, arguments.length ? { data: arguments[0] } : {})
      const result = fn.apply(this, [param])
      return result
    }
  }
}

/**
 * @module Delete
 * @param { string }
 * @auther kaichao.feng
 * @description 请求方法
 */
export const Delete = (path: string) => {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function () {
      const param: AxiosRequestConfig = Object.assign({
        url: `${target.prifix as string}${path.replace(/^\//g, '')}`,
        method: 'DELETE'
      }, arguments.length ? { data: arguments[0] } : {})
      const result = fn.apply(this, [param])
      return result
    }
  }
}

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
