// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL?: string
  readonly VITE_APP_BASE_API?: string
  readonly VITE_APP_MOCK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
