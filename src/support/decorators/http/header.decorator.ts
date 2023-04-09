import { MetadataKey } from '../../types/enums'

/**
 * Request method Decorator.  Sets a request header.
 *
 * For example:
 * `@Header('Cache-Control', 'none')`
 *
 * @param name string to be used for header name
 * @param value string to be used for header value
 * @auther kaichao.feng
 * @returns { MethodDecorator } MethodDecorator
 * @publicApi
 */
export const Header = (name: string, value: string): MethodDecorator => {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const headers: Record<string, any> =
      Reflect.getMetadata(MetadataKey.REQUEST_METADATA, target, propertyKey) ??
      {}
    Object.assign(headers, { [name]: value })
    Reflect.defineMetadata(
      MetadataKey.REQUEST_METADATA,
      headers,
      target,
      propertyKey
    )
  }
}
