/* eslint-disable new-cap */
import { MetadataKey } from './types/enums.d'
import { createDecorator, Vue, VueBase } from 'vue-class-component'
import { isFunction } from '@vueuse/shared'

export const registerDeepClass = (
  providers: Array<Core.Constructor<any>>
): Array<Core.Constructor<any>> => {
  try {
    return (
      providers?.map((provider: any) => {
        const deepNeedProviders = Reflect.getMetadata(
          MetadataKey.PARAMTYPES_METADATA,
          provider
        )
        return !deepNeedProviders
          ? new provider()
          : new provider(...registerDeepClass(deepNeedProviders))
      }) ?? []
    )
  } catch (error) {
    console.log(error)
    return []
  }
}

export const Injection = (provide?: any) => {
  return (target: any, propertyName: any) => {
    const propertyValue: Core.Constructor<any> = Reflect.getMetadata(
      MetadataKey.TYPE_METADATA,
      target,
      propertyName
    )
    const decorator = createDecorator((options, key) => {
      options.computed = options.computed || {}
      const value = provide
        ? isFunction(provide)
          ? registerDeepClass([provide])[0]
          : provide
        : provide || (propertyValue && registerDeepClass([propertyValue])[0])
      options.computed[key] = {
        cache: false,
        get(this: Vue) {
          return value
        }
      }
    })
    decorator.apply(target.constructor, <
      [target: VueBase, key: string, index: number]
    >(<unknown>[target.constructor, propertyName]))
  }
}
