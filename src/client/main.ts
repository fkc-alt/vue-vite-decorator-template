import { HttpFactory, Logger, ResponseConfig } from 'http-typedi'
import { ElMessage } from 'element-plus'
import { getToken, removeStorage, setData } from '@/utils'
import { AppModule } from './app.module'
import { useUserStore } from '@/store/user'
import { logoutCodes, successCodes } from './constant'

/**
 *
 * @module Services
 * @return { AppModule } AppModule
 * @description service for entry file
 */
function createHTTPClient(): AppModule {
  const user = useUserStore()
  const HTTPClient = HttpFactory.create(AppModule)
  HTTPClient.useLogger(Logger)
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
  HTTPClient.setGlobalCatchCallback(err => {
    if (logoutCodes.includes(err?.data?.code)) {
      removeStorage('token', 'roleIdList')
      user.forRoot({ token: '', roleIdList: [], userInfo: '' })
      ElMessage.warning(err?.data?.msg ?? '登录状态异常，请重新登录')
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      return Promise.reject(err?.data?.msg)
    }
  })
  HTTPClient.useInterceptorsRes(
    (result: ResponseConfig<Services.Common.Response>) => {
      if ((result as any)?.responseHeaders?.auth_token) {
        user.forRoot({ token: (result as any)?.responseHeaders?.auth_token })
        setData({ token: (result as any)?.responseHeaders?.auth_token })
      }
      if (logoutCodes.includes(result?.data?.code)) {
        removeStorage('token', 'roleIdList')
        user.forRoot({ token: '', roleIdList: [], userInfo: '' })
        ElMessage.warning(result?.data?.msg ?? '登录状态异常，请重新登录')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        return Promise.reject(result.data.msg)
      }
      const sholidError =
        result?.status !== 200 || !successCodes.includes(result?.data?.code)
      if (!sholidError) return result.data
      ElMessage.error(result?.data?.msg ?? '系统错误')
      return Promise.reject(result.data.msg) // or throw result
    }
  )
  return HTTPClient
}

export default createHTTPClient
