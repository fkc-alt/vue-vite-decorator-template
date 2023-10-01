import { HttpFactory, ResponseConfig } from 'http-typedi'
import { getToken, setData } from '@/utils'
import { AppModule } from './app.module'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'

const successCodes = [200, '200', '0', 9]

/**
 *
 * @module Services
 * @return { AppModule } AppModule
 * @description service for entry file
 */
function createHTTPClient(): AppModule {
  const user = useUserStore()
  const HTTPClient = HttpFactory.create(AppModule)
  HTTPClient.setGlobalPrefix(
    location.origin + import.meta.env.VITE_APP_BASE_API
  )
  HTTPClient.setGlobalCatchCallback((error: any) => {
    console.error(error, 'global catch callback')
  })
  HTTPClient.useInterceptorsReq(configure => {
    const Authorization = getToken() // Bearer
    if (Authorization && configure.headers)
      configure.headers['AUTHORIZATION-WITH-MALL'] = Authorization
    return configure
  })
  HTTPClient.useInterceptorsRes(
    (result: ResponseConfig<Services.Common.Response>) => {
      console.log(result, 'useInterceptorsRes')
      if ((result as any)?.responseHeaders?.auth_token) {
        user.forRoot({ token: (result as any)?.responseHeaders?.auth_token })
        setData({ token: (result as any)?.responseHeaders?.auth_token })
      }
      const callError =
        result?.status !== 200 && successCodes.includes(result?.data?.code)
      if (!callError) return result.data
      ElMessage.error(result?.data?.msg ?? '系统错误')
      return Promise.reject(result.data.msg) // or throw result
    }
  )
  return HTTPClient
}

export default createHTTPClient
