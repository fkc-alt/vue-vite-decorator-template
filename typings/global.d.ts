declare namespace CustomProvider {
  interface Provider {
    inject: {
      AppLogger: (_APP_INFO_: _APP_INFO_) => void
      AppLogger2: (_APP_INFO_: _APP_INFO_) => void
    }
    test: {
      default: () => void
    }
    [key: string]
  }
  interface _APP_INFO_ {
    pkg: Pick<typeof import('package.json'), 'name' | 'version' | 'dependencies' | 'devDependencies'>
    lastBuildTime: string
  }
}

declare const _APP_INFO_: CustomProvider._APP_INFO_
declare const AppLogger: (_APP_INFO_: CustomProvider._APP_INFO_) => void
declare const AppLogger2: (_APP_INFO_: CustomProvider._APP_INFO_) => void
declare const provider: CustomProvider.Provider

declare interface Window {
  _APP_INFO_: CustomProvider._APP_INFO_
  provider: CustomProvider.Provider
}
