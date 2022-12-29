declare const _APP_INFO_: {
  pkg: Pick<typeof import('package.json'), 'name' | 'version' | 'dependencies' | 'devDependencies'>
  lastBuildTime: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
declare const getAppInfo = (ctx: Window) => {}
