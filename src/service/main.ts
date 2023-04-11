import { SuperFactory } from '@/support/core'
import AppModule from './app.module'

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
  return application
}
const application = bootstrap()

export { application }
