import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils'
const instance: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
}
/**
 * @author kaichao.Feng
*/
class Service {
  private readonly instance: AxiosInstance
  /**
     * @method constructor
     * @param { Object } config
    */
  constructor (config: AxiosRequestConfig) {
    this.instance = Axios.create(config)
    this.interceptorsReq()
    this.interceptorsRes()
  }

  /**
     * @method interceptorsReq
     * @return { Promise } Promise
    */
  private interceptorsReq (): void {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const Authorization = getToken()
      // before handler send request
      if ((Authorization !== '') && (config.headers != null)) config.headers.Authorization = 'Bearer ' + Authorization
      return config
    }, async (err: unknown) => {
      // request error handler
      return await Promise.reject(err)
    })
  }

  /**
     * @method interceptorsRes
     * @return { Promise } Promise
    */
  private interceptorsRes (): void {
    this.instance.interceptors.response.use((res: AxiosResponse<Services.Common.Response>) => {
      // response data handler
      const { status, data } = res
      const HTTPCODE = [0, 200]
      if (HTTPCODE.includes(status) && HTTPCODE.includes(data.code)) return data
      ElMessage.error({ message: data.message })
      return Promise.reject(data.message)
    }, async (err) => {
      ElMessage.error({ message: err?.response.data.message })
      // request error handler
      return await Promise.reject(err?.response.data.message)
    })
  }

  /**
     * @method request
     * @param { Object } config
     * @return { ServerRes<U> }
    */
  public async request<T, U> (config: AxiosRequestConfig<T>): ServerRes<U> {
    return await this.instance.request<{}, ServerRes<U>, T>(config)
  }
}

export default new Service(instance)
