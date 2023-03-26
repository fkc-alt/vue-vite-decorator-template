export {}

declare module 'vue' {
  class VuePropertyCustomAssets {
    readonly Test: string
    readonly NotImagesNot: string
    readonly NotImagesNotCloud: string
  }
  interface VuePropertyCustomAssetsInstanceType
    extends InstanceType<typeof VuePropertyCustomAssets> {}
  type ForVuePropertyCustomAssetsInstanceType<T, K = keyof T> = {
    [P in K]: T[P]
  }
  export interface ComponentCustomProperties
    extends ForVuePropertyCustomAssetsInstanceType<VuePropertyCustomAssetsInstanceType> {
    application: InstanceType<typeof import('@/service/app.module').default>
  }
  export default VuePropertyCustomAssets
}

declare module 'vue-property-decorator' {
  import { Options } from 'vue-property-decorator'
  export { Options }
}
