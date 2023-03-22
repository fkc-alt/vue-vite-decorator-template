/**
 * @module UseGuards
 * @method AuthGuard
 * @param { string[] }
 * @auther kaichao.feng
 * @description 请求路由鉴权守卫
 */
export declare const AuthGuard: (exclude: string[]) => MethodDecorator
/**
   * @module Catch
   * @method CatchError
   * @auther kaichao.feng
   * @description TryCatch异常捕获
   */
export declare const CatchError: () => MethodDecorator
/**
 * @description 聚合装饰器
 * @returns MethodDecorator
 */
export default function Auth (exclude: string[]): MethodDecorator
