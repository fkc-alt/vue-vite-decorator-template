/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-types */
import { plainToInstance } from 'class-transformer'
import { ValidationError, validateSync } from 'class-validator'
import { SuperFactory } from '../../../support/core'
import { MetadataKey, Method } from '../../types/enums'
import { flattenErrorList } from '../../helper/param-error'

async function handlerResult(
  this: any,
  target: Object,
  propertyKey: string | symbol,
  param: Record<string, any>,
  fn: (params: any) => any
): Promise<any> {
  try {
    const result: any = await fn.call(this, param)
    const callError = result.status !== 200 || result.data.code !== 200
    return !callError ? result.data : await Promise.reject(result)
  } catch (error) {
    const currentTargetCatchCallback = Reflect.getMetadata(
      MetadataKey.CATCH_METADATA,
      target.constructor
    )
    const currentCatchCallback = Reflect.getMetadata(
      MetadataKey.CATCH_METADATA,
      target,
      propertyKey
    )
    if (currentCatchCallback) {
      currentCatchCallback?.(error)
    } else if (currentTargetCatchCallback) {
      currentTargetCatchCallback?.(error)
    } else {
      ;(SuperFactory as any).globalCatchCallback?.(error)
    }
    return await Promise.reject(error)
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
  method: Method,
  message?: string | ((validationError: ValidationError[]) => any)
): MethodDecorator => {
  return function (target, key, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('CustomRequest', true, target, key)
    const fn: (params: any) => any = descriptor.value
    const DTO: any[] = Reflect.getMetadata(
      MetadataKey.PARAMTYPES_METADATA,
      target,
      key
    )?.filter((target: any) => target.name !== 'Object')
    descriptor.value = async function (params: any) {
      const handelParam = (): Record<string, any> => {
        const hasGet = [Method.GET, Method.get].includes(method)
        const globalPrefix = (SuperFactory as any).globalPrefix
        const currentPrefix = (target as Record<'prefix', string>).prefix
        const requestPath = path.replace(/^\//g, '')
        const requestURL = `${globalPrefix}${currentPrefix}${requestPath}`
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [prefixUrl, ...paramList] = requestURL.split('/:')
        const headers: Record<string, any> =
          Reflect.getMetadata(MetadataKey.REQUEST_METADATA, target, key) ?? {}
        const data = {
          [hasGet ? 'params' : 'data']: params
        }
        const url = paramList
          .reduce(
            (prev, next) => prev.replace(new RegExp(next), params[next]),
            requestURL
          )
          .replace(/:/g, '')
        const reqJson: Record<string, any> = {
          url,
          method,
          ...(paramList.length ? {} : data),
          headers
        }
        return reqJson
      }
      if (DTO.length) {
        const errors: ValidationError[] = DTO.reduce(
          (prev: ValidationError[], target) => {
            return [...prev, ...validateSync(plainToInstance(target, params))]
          },
          []
        )
        if (errors.length) {
          if (!message) {
            const messages: string[] = flattenErrorList(errors)
            console.error(messages)
          } else if (typeof message === 'string') {
            console.error(message)
          } else {
            console.error(message?.(errors) ?? errors)
          }
          return await handlerResult.call(this, target, key, handelParam(), fn)
        }
        return await handlerResult.call(this, target, key, handelParam(), fn)
      }
      return await handlerResult.call(this, target, key, handelParam(), fn)
    }
  }
}

/**
 * @module Request
 * @method Get
 * @param { string } path
 * @auther kaichao.feng
 * @description Request Method
 */
export const Get = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.GET, message)

/**
 * @module Request
 * @method Post
 * @param { string } path
 * @auther kaichao.feng
 * @description Request Method
 */
export const Post = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.POST, message)

/**
 * @module Request
 * @method Delete
 * @param { string } path
 * @auther kaichao.feng
 * @description Request Method
 */
export const Delete = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.DELETE, message)

/**
 * @module Request
 * @method Patch
 * @param { string } path
 * @auther kaichao.feng
 * @description Request Method
 */
export const Patch = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.PATCH, message)

/**
 * @module Request
 * @method Options
 * @param { string } path
 * @auther kaichao.feng
 * @description Request Method
 */
export const Options = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.OPTIONS, message)

/**
 * @module Request
 * @method Head
 * @param { string } path
 * @auther kaichao.feng
 * @description Request Method
 */
export const Head = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.HEAD, message)

/**
 * @module Request
 * @method Put
 * @param { string } path
 * @auther kaichao.feng
 * @description Request Method
 */
export const Put = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.PUT, message)
