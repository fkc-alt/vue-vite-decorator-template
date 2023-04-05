/**
 * Request method Decorator.  Sets a response header.
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
  return function (target, key, descriptor: PropertyDescriptor) {
    const fn: (params: any) => any = descriptor.value
    descriptor.value = function (params: any) {
      const { headers = {}, ...requestConfig } = params
      Object.assign(headers, { [name]: value })
      return fn.apply(this, [{ ...requestConfig, headers }])
    }
  }
}
