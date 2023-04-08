/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/ban-types */
import { SuperFactory } from '../core'
import { MetadataKey } from '../types/enums'

export async function handlerResult(
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
    const currentCatchCallback = Reflect.getMetadata(
      MetadataKey.CATCH_METADATA,
      target,
      propertyKey
    )
    if (currentCatchCallback) {
      currentCatchCallback?.(error)
    } else {
      ;(SuperFactory as any).globalCatchCallback(error)
    }
    return await Promise.reject(error)
  }
}
