import { MetadataKey } from '../../types/enums'

/* eslint-disable @typescript-eslint/ban-types */
export const Catch = (errorCallback: Function): MethodDecorator => {
  return function (target, propertyKey, decorator) {
    Reflect.defineMetadata(
      MetadataKey.CATCH_METADATA,
      errorCallback,
      target,
      propertyKey
    )
  }
}
