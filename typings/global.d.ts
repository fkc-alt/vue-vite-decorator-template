declare const _APP_INFO_: {
  pkg: Pick<typeof import('package.json'), 'name' | 'version' | 'dependencies' | 'devDependencies'>
  lastBuildTime: string
}
