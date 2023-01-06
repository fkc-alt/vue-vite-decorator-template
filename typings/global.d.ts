declare namespace CostomProvider {
  interface Provider {
    inject: {
      AppLogger: (_APP_INFO_: _APP_INFO_) => void
      AppLogger2: (_APP_INFO_: _APP_INFO_) => void
    }
    test: {
      default: () => void
    }
    [key: string | keyof Provider]
  }
  interface _APP_INFO_ {
    pkg: Pick<typeof import('package.json'), 'name' | 'version' | 'dependencies' | 'devDependencies'>
    lastBuildTime: string
  }
}

declare const _APP_INFO_: CostomProvider._APP_INFO_
declare const AppLogger: (_APP_INFO_: CostomProvider._APP_INFO_) => void
declare const AppLogger2: (_APP_INFO_: CostomProvider._APP_INFO_) => void
declare const provider: CostomProvider.Provider

declare interface Window {
  _APP_INFO_: CostomProvider._APP_INFO_
  provider: CostomProvider.Provider
}
