import 'reflect-metadata'
import { HttpFactory } from 'http-typedi'
import { getToken } from '@/utils'
import { AppModule } from './app.module'

/**
 *
 * @module Services
 * @return { AppModule } AppModule
 * @description service for entry file
 */
function createHTTPClient(): AppModule {
  const HTTPClient = HttpFactory.create(AppModule)
  HTTPClient.setGlobalCatchCallback((error: any) => {
    console.error(error, 'global catch callback')
  })
  HTTPClient.setGlobalPrefix(import.meta.env.VITE_APP_BASE_API)
  HTTPClient.useInterceptorsReq(configure => {
    const Authorization = getToken()
    if (Authorization && configure.headers)
      configure.headers.Authorization = `Bearer ${Authorization}`
    return configure
  })
  return HTTPClient
}

const HTTPClient = createHTTPClient()

export default HTTPClient
