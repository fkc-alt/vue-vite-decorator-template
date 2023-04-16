import { SuperFactory } from '@/support/core'
import AppModule from './app.module'
import { getToken } from '@/utils'

/**
 *
 * @module Services
 * @return { application } AppModule
 * @description service for entry file
 */
function bootstrap(): AppModule {
  const application = SuperFactory.create(AppModule)
  application.setGlobalCatchCallback((error: any) => {
    console.error(error, 'global catch callback')
  })
  application.setGlobalPrefix(import.meta.env.VITE_APP_BASE_API)
  application.useInterceptorsReq((configure: Core.RequestConfig) => {
    const Authorization = getToken()
    if (Authorization && configure.headers)
      configure.headers.Authorization = `Bearer ${Authorization}`
    return configure
  })
  application.useInterceptorsRes((result: Record<string, any>) => {
    console.log('global InterceptorsRes', result)
    const callError = result.status !== 200 || result.data.code !== 200
    if (!callError) return result.data
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw result
  })
  return application
}
const application = bootstrap()

export { application }
