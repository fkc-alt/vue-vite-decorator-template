import { MetadataKey } from '../../types/enums'

/**
 * @module Request
 * @auther kaichao.feng
 * @description 标注是否为请求依赖
 */
export const Request = (): ClassDecorator => (target: object) =>
  Reflect.defineMetadata(MetadataKey.REQUEST_SERVICE, true, target)
