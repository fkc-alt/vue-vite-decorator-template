/* eslint-disable @typescript-eslint/ban-types */
import { plainToInstance } from 'class-transformer'
import { ValidationError, validateSync } from 'class-validator'
import { MetadataKey, Method } from '../../types/enums'
import { flattenErrorList } from '../../helper/param-error'
import { handlerResult } from '@/support/helper'

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
        const requestURL = `${
          (target as Record<'prifix', string>).prifix
        }${path.replace(/^\//g, '')}`
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [prifixUrl, ...paramList] = requestURL.split('/:')
        const data = { [hasGet ? 'params' : 'data']: params }
        const url = paramList
          .reduce(
            (prev, next) => prev.replace(new RegExp(next), params[next]),
            requestURL
          )
          .replace(/:/g, '')
        const reqJson: Record<string, any> = {
          url,
          method,
          ...(paramList.length ? {} : data)
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
