import { MetadataKey } from '../types/enums'

/* eslint-disable @typescript-eslint/ban-types */
export const handlerResult = async (
  that: any,
  target: Object,
  param: any,
  fn: (params: any) => any
): Promise<any> => {
  try {
    const result: any = await fn.apply(that, param)
    const callError = result.status !== 200 || result.data.code !== 200
    callError &&
      Reflect.getMetadata(MetadataKey.CATCH_METADATA, target)?.(result.data)
    return !callError ? result.data : await Promise.reject(result)
  } catch (error) {
    Reflect.getMetadata(MetadataKey.CATCH_METADATA, target)?.(error)
    return await Promise.reject(error)
  }
}
