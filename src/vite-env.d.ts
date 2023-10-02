/// <reference types="vite/client" />
/// <reference types="reflect-metadata" />

interface ImportMetaEnv {
  readonly VITE_APP_PROJECT_ICON: string
  readonly VITE_APP_PROJECT_USERNAME: string
  readonly VITE_APP_PROJECT_PASSWORD: string
  readonly VITE_PROJECT_TITLE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_BASE_OSS_API: string
  readonly VITE_APP_BASE_OSS_URL: string
  readonly VITE_APP_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
