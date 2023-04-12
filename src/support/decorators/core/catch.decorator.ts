import { MetadataKey } from '../../types/enums'

/* eslint-disable @typescript-eslint/ban-types */
export const Catch = (
  catchCallback: Function
): MethodDecorator & ClassDecorator => {
  return function (...args: any) {
    const [target, propertyKey = ''] = args as Parameters<MethodDecorator>
    const metadataArgs: any = [
      MetadataKey.CATCH_METADATA,
      catchCallback,
      target,
      propertyKey
    ].filter(Boolean)
    Reflect.defineMetadata.apply(null, metadataArgs)
  }
}
