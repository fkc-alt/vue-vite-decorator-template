import { Method, RouteParamtypes, ModuleMetadata } from './types/enums'
/**
 *
 * @param type
 * @returns
 */
export declare const Type: (type: any) => (target: Core.Constructor<any>) => void
export declare const ParamTypes: (...type: any) => (target: Core.Constructor<any>) => void
export declare const ReturnType: (type: any) => (target: Core.Constructor<any>) => void
export declare const applyDecorators: (...decorators: Function[]) => MethodDecorator
/**
 * @publicApi
 */
export declare class SuperFactoryStatic {
  globalModule: Array<Core.Constructor<any>>
  create<T>(target: Core.Constructor<T>): T
}
/**
 * @module SupportFactory
 * @param { Core.Constructor<T> } Core.Constructor<T>
 * @returns { T } Function
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 * */
export declare const SuperFactory: SuperFactoryStatic
/**
 * @module Factory
 * @param { Constructor<T> }
 * @returns { T }
 * @auther kaichao.feng
 * @description 依赖注入工厂函数
 */
export declare const Factory: <T>(target: Core.Constructor<T>) => T
/**
 * @module Injectable
 * @auther kaichao.feng
 * @description 标注依赖注入
 */
export declare const Injectable: () => ClassDecorator
/**
 * @module Request
 * @auther kaichao.feng
 * @description 标注是否为请求依赖
 */
export declare const Request: () => ClassDecorator
export declare const Injection: (...args: any) => (target: any, propertyName: string) => void
/**
 * @module Inject
 * @auther kaichao.feng
 * @description 具名依赖注入 搭配Param使用
 */
export declare const Inject: () => MethodDecorator
/**
 * @module assignMetadata
 * @auther kaichao.feng
 * @returns { Record<string, any> } Record<string, any>
 */
export declare const assignMetadata: <TParamtype = any, TArgs = any>(args: TArgs, paramtype: TParamtype, index: number, data?: any, pipe?: Array<Core.Constructor<any> | Object>) => Record<string, any>
/**
 * @method createParamDecorator
 * @auther kaichao.feng
 * @description this is @Param Helper Function
 */
export declare const createParamDecorator: (paramtype: RouteParamtypes) => (data?: any, pipe?: Array<Core.Constructor<any> | Object>) => ParameterDecorator
/**
 * @method Param
 * @auther kaichao.feng
 * @description 搭配Inject使用，Param传递的property会通过Inject读取原始参数并返回指定的key对应的value，并返回到当前装饰器形参位置
 */
export declare const Param: (property?: string | string[], ...pipe: Array<Core.Constructor<any> | Object>) => ParameterDecorator
/**
 * @module Global
 * @auther kaichao.feng
 * @description 全局模块
 */
export declare const Global: () => (target: Core.Constructor<any>) => void
/**
 * @module Module
 * @param { ModuleMetadata }
 * @auther kaichao.feng
 * @description 模块管理函数
 */
export declare const Module: (metadata: Core.ModuleMetadata) => ClassDecorator
/**
 * @module Controller
 * @param { string }
 * @auther kaichao.feng
 * @description Request Controller
 */
export declare const Controller: (prifix?: string) => ClassDecorator
/**
 * @module RequestFactory
 * @method RequestMapping
 * @param { string }
 * @auther kaichao.feng
 * @returns { MethodDecorator } MethodDecorator
 * @description Request Factory
 */
export declare const RequestMapping: (path: string, method: Method) => MethodDecorator
/**
 * @module Request
 * @method Get
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export declare const Get: (path: string) => MethodDecorator
/**
 * @module Request
 * @method Post
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export declare const Post: (path: string) => MethodDecorator
/**
 * @module Request
 * @method Delete
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export declare const Delete: (path: string) => MethodDecorator
/**
 * @module Request
 * @method Put
 * @param { string }
 * @auther kaichao.feng
 * @description Request Method
 */
export declare const Put: (path: string) => MethodDecorator
/**
 * @module Pipe
 * @method ParseIntPipe
 * @auther kaichao.feng
 * @description 字符串转化为整数
 */
export declare class ParseIntPipe {
  transform (integer: any): number
}
/**
 * @module Pipe
 * @method DefaultValuePipe
 * @auther kaichao.feng
 * @description 参数绑定默认值
 */
export declare class DefaultValuePipe {
  defaultValue: any
  constructor (defaultValue: any)
}
