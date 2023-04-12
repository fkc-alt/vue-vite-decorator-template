import { MetadataKey } from '../../types/enums'

/**
 * @module Injectable
 * @auther kaichao.feng
 * @description 标注依赖注入
 * @returns { ClassDecorator } ClassDecorator
 */
export const Injectable = (): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(MetadataKey.INJECTABLE_WATERMARK, true, target)
  }
}
