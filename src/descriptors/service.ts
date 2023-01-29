/* eslint-disable prefer-rest-params */
import { AxiosRequestConfig } from 'axios'

export const Controller = (prifix = ''): any => {
  return function (target: any) {
    target.prototype.prifix = prifix ? prifix.replace(/^\//g, '') + '/' : ''
  }
}

export const Get = (path: string): any => {
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

export const Post = (path: string): any => {
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

export const Delete = (path: string): any => {
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

export const ParamDec = (): any => {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    // eslint-disable-next-line prefer-rest-params
    console.log(target, key, descriptor, '餐宿装饰器', arguments)
  }
}
