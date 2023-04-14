import { MetadataKey } from '../../types/enums'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Interceptor = (configure: Record<string, any>) => any
export const UseInterceptors = (...interceptors: Interceptor[]) => {
  return function (...args: any) {
    const [target, propertyKey] = args as Parameters<MethodDecorator>
    const metadataArgs: any = [
      MetadataKey.INTERCEPTORS_METADATA,
      interceptors || [],
      target,
      propertyKey
    ].filter(Boolean)
    Reflect.defineMetadata.apply(null, metadataArgs)
  }
}
