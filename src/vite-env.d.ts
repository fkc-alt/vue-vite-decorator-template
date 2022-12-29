/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_PROJECT_ICON: string
  readonly VITE_PROJECT_TITLE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
