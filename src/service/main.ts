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
  application.useInterceptors((configure: Record<string, any>) => {
    const Authorization = getToken()
    if (Authorization && configure.headers)
      configure.headers.Authorization = `Bearer ${Authorization}`
    return configure
  })
  return application
}
const application = bootstrap()

export { application }
