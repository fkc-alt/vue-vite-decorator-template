export {}

declare module 'vue' {
  class VuePropertyCustomAssets {
    readonly Test: string
    readonly NotImagesNot: string
    readonly NotImagesNotCloud: string
  }
  export interface ComponentCustomProperties
    extends Pick<VuePropertyCustomAssets, keyof VuePropertyCustomAssets> {}
  export default VuePropertyCustomAssets
}

declare module 'vue-property-decorator' {
  import { Options } from 'vue-property-decorator'
  export { Options }
}
