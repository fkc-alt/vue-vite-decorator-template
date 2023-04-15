import { MetadataKey } from '../../types/enums'
import { Interceptor } from './use-interceptors-req.decortaor'

// eslint-disable-next-line @typescript-eslint/ban-types
export const UseInterceptorsRes = (...interceptors: Interceptor[]) => {
  return function (...args: any) {
    const [target, propertyKey] = args as Parameters<MethodDecorator>
    const metadataArgs: any = [
      MetadataKey.INTERCEPTORSRES_METADATA,
      interceptors || [],
      target,
      propertyKey
    ].filter(Boolean)
    Reflect.defineMetadata.apply(null, metadataArgs)
  }
}
