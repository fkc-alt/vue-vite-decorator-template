declare const _APP_INFO_: {
  pkg: Pick<typeof import('package.json'), 'name' | 'version' | 'dependencies' | 'devDependencies'>
  lastBuildTime: string
}

declare const AppLogger: (_APP_INFO_: _APP_INFO_) => void
