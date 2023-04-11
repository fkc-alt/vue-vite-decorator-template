import { SuperFactory } from '@/support/core'
import AppModule from './app.module'

/**
 *
 * @module Services
 * @return { application } AppModule
 * @description service for entry file
 */
function bootstrap() {
  const application = SuperFactory.create(AppModule)
  SuperFactory.setGlobalCatchCallback((error: any) => {
    console.error(error, 'global catch callback')
  })
  SuperFactory.setGlobalPrefix(import.meta.env.VITE_APP_BASE_API)
  return application
}
const application = bootstrap()

export { application }
