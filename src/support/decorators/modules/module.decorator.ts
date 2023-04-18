/**
 * @module Module
 * @param { ModuleMetadata }
 * @auther kaichao.feng
 * @description 模块管理函数
 */
export const Module = (metadata: Core.ModuleMetadata): ClassDecorator => {
  const properties = Object.keys(metadata)
  return (target: any) => {
    properties.forEach(property => {
      // 只添加非空的元数据信息
      if (metadata[property as keyof Core.ModuleMetadata]) {
        Reflect.defineMetadata(
          property,
          metadata[property as keyof Core.ModuleMetadata],
          target
        )
      }
    })
  }
}
