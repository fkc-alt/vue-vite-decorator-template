/* eslint-disable prefer-rest-params */
/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils'

interface ModuleMetadata {
  controllers?: any[]
  providers?: any[]
}

export class Demo {
  age = 20
}

type Constructor<T = any> = new (...args: any[]) => T
interface ClassProvider<T> {
  provide: Constructor<T>
  useClass: Constructor<T>
}

export const Type = (type: any): (target: Function) => void => Reflect.metadata('design:type', type)
export const ParamTypes = (...type: any): (target: Function) => void => Reflect.metadata('design:paramtypes', type)
export const ReturnType = (type: any): (target: Function) => void => Reflect.metadata('design:returntype', type)

/**
 * @module Container
 * @class Container
 * @param { ClassProvider<T> }
 * @async kaichao.feng
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
  inject (token: Constructor<any>): Constructor<any> | undefined {
    return this.providers.get(token)?.useClass
  }
}

/**
 * @module Factory
 * @class Factory
 * @param { Constructor<T> }
 * @returns { T }
 * @async kaichao.feng
 * @description 依赖注入工厂函数
 */
export const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('providers', target)
  // 下面的Continer就是我们之前建立的数据仓库，我们把依赖放进去
  const continer = new Container()
  for (let i = 0; i < providers.length; i++) {
    continer.addProvider({ provide: providers[i], useClass: providers[i] })
  }
  const controllers = Reflect.getMetadata('controllers', target)
  for (let i = 0; i < controllers.length; i++) {
    const currNeedProviders = Reflect.getMetadata('design:paramtypes', controllers[i])
    if (!currNeedProviders) continue
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const registerDeepClass = (providers: Array<Constructor<any>>): Array<Constructor<any>> => {
      return providers.map((provider: any) => {
        const currentNeedPro: any = continer.inject(provider)
        const deepNeedProviders = Reflect.getMetadata('design:paramtypes', provider)
        return !deepNeedProviders ? new currentNeedPro() : new currentNeedPro(...registerDeepClass(deepNeedProviders))
      })
    }
    controllers[i] = new controllers[i](...registerDeepClass(currNeedProviders))
  }
  return new target(...controllers)
}

/**
 * @module Module
 * @class Module
 * @param { ModuleMetadata }
 * @async kaichao.feng
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
 * @class Controller
 * @param { string }
 * @async kaichao.feng
 * @description 接口控制器
 */
export const Controller = (prifix = '') => {
  return function (target: any) {
    target.prototype.prifix = prifix ? prifix.replace(/^\//g, '') + '/' : ''
  }
}

export const Injectable = (): ClassDecorator => (target) => {}

/**
 * @module Get
 * @class Get
 * @param { string }
 * @async kaichao.feng
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
 * @class Post
 * @param { string }
 * @async kaichao.feng
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
 * @class Delete
 * @param { string }
 * @async kaichao.feng
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
 * @class AuthGuard
 * @param { string[] }
 * @async kaichao.feng
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

export const ParamDec = (): any => {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    // eslint-disable-next-line prefer-rest-params
    console.log(target, key, descriptor, '餐宿装饰器', arguments)
  }
}
