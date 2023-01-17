export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    Test: string
    NotImagesNot: string
    NotImagesNotCloud: string
  }
}
