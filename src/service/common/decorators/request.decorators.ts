import { ElMessage } from 'element-plus'
import { applyDecorators } from '@/support/core'
import { getToken } from '@/utils'

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
      const hasAuth =
        exclude.every(item => !new RegExp(`${item}$`).test(args[0].url)) &&
        !getToken()
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
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`CatchError: ${error}`)
      }
    }
  }
}

/**
 * @description 聚合装饰器
 * @returns MethodDecorator
 */
export default function Auth(exclude: string[]): MethodDecorator {
  return applyDecorators(AuthGuard(exclude), CatchError())
}
