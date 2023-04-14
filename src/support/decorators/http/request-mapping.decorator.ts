/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-types */
import { plainToInstance } from 'class-transformer'
import { ValidationError, validateSync } from 'class-validator'
import { Interceptor, SuperFactory } from '../../../support/core'
import { MetadataKey, Method } from '../../types/enums'
import { flattenErrorList } from '../../helper/param-error'
import { isFunction } from '../../helper'

type CatchCallback = (err: any) => void

const getInterceptors = (
  target: Object,
  propertyKey: string | symbol
): Interceptor[] => {
  return (
    Reflect.getMetadata(
      MetadataKey.INTERCEPTORS_METADATA,
      target,
      propertyKey
    ) ??
    Reflect.getMetadata(
      MetadataKey.INTERCEPTORS_METADATA,
      target.constructor
    ) ??
    (SuperFactory as any).globalInterceptors ??
    []
  )
}

const getCatchCallback = (
  target: Object,
  propertyKey: string | symbol
): CatchCallback => {
  return (
    Reflect.getMetadata(MetadataKey.CATCH_METADATA, target, propertyKey) ??
    Reflect.getMetadata(MetadataKey.CATCH_METADATA, target.constructor) ??
    (SuperFactory as any).globalCatchCallback
  )
}

async function handlerResult(
  this: any,
  target: Object,
  propertyKey: string | symbol,
  param: Record<string, any>,
  fn: (params: any) => any
): Promise<any> {
  try {
    const interceptors = getInterceptors(target, propertyKey)
    const result: any = await fn.call(
      this,
      interceptors.reduce((prev, next) => next(prev), param)
    )
    const callError = result.status !== 200 || result.data.code !== 200
    return !callError ? result.data : await Promise.reject(result)
  } catch (error) {
    const catchCallback = getCatchCallback(target, propertyKey)
    catchCallback?.(error)
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
    const DTO: any[] =
      Reflect.getMetadata(MetadataKey.PARAMTYPES_METADATA, target, key)?.filter(
        (target: any) => target.name !== 'Object'
      ) ?? []
    descriptor.value = async function (params: any) {
      const handelParam = (): Record<string, any> => {
        const hasGet = [Method.GET, Method.get].includes(method)
        const globalPrefix: string = (SuperFactory as any).globalPrefix
        const currentPrefix = (target as Record<'prefix', string>).prefix
        const requestPath: string = path.replace(/^\//g, '')
        const requestURL = `${globalPrefix}${currentPrefix}${requestPath}`
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [prefixUrl, ...paramList] = requestURL.split('/:')
        const currentTargetHeaders: Record<string, any> =
          Reflect.getMetadata(
            MetadataKey.REQUEST_METADATA,
            target.constructor
          ) ?? {}
        const currentHeaders: Record<string, any> =
          Reflect.getMetadata(MetadataKey.REQUEST_METADATA, target, key) ?? {}
        Object.assign(currentTargetHeaders, currentHeaders)
        for (const key in currentTargetHeaders) {
          if (isFunction(currentTargetHeaders[key])) {
            currentTargetHeaders[key] = currentTargetHeaders[key]()
          }
        }
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
          headers: currentTargetHeaders
        }
        return reqJson
      }
      const result = await handlerResult.call(
        this,
        target,
        key,
        handelParam(),
        fn
      )
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
          return result
        }
        return result
      }
      return result
    }
  }
}

/**
 * @module Request
 * @method Get
 * @param { string } path
 * @param { string | ((validationArguments: ValidationError[]) => any) } message
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
 * @param { string | ((validationArguments: ValidationError[]) => any) } message
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
 * @param { string | ((validationArguments: ValidationError[]) => any) } message
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
 * @param { string | ((validationArguments: ValidationError[]) => any) } message
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
 * @param { string | ((validationArguments: ValidationError[]) => any) } message
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
 * @param { string | ((validationArguments: ValidationError[]) => any) } message
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
 * @param { string | ((validationArguments: ValidationError[]) => any) } message
 * @auther kaichao.feng
 * @description Request Method
 */
export const Put = (
  path: string,
  message?: string | ((validationArguments: ValidationError[]) => any)
): MethodDecorator => RequestMapping(path, Method.PUT, message)
