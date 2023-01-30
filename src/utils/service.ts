import Axios, * as axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils'
import { CatchError } from '@/descriptors'
import { AuthGuard } from '@/descriptors/service'

const exclude = ['login', 'register']

/**
 * @author kaichao.Feng
*/
export default class Service {
  private readonly instance: axios.AxiosInstance
  /**
     * @method constructor
     * @param { Object } config
    */
  constructor (config: axios.AxiosRequestConfig = { baseURL: import.meta.env.VITE_APP_BASE_API }) {
    this.instance = Axios.create(config)
    this.interceptorsReq()
    this.interceptorsRes()
  }

  /**
     * @method interceptorsReq
     * @return { Promise<axios.AxiosRequestConfig | axios.AxiosError> } Promise
    */
  private interceptorsReq (): void {
    this.instance.interceptors.request.use((config: axios.AxiosRequestConfig) => {
      const Authorization = getToken()
      // before handler send request
      if (Authorization && config.headers) config.headers.Authorization = 'Bearer ' + Authorization
      return config
    }, async (err: axios.AxiosError) => {
      // request error handler
      return await Promise.reject(err)
    })
  }

  /**
     * @method interceptorsRes
     * @return { Promise<axios.AxiosResponse<Services.Common.Response> | axios.AxiosError<Services.Common.Response>> } Promise
    */
  private interceptorsRes (): void {
    this.instance.interceptors.response.use((res: axios.AxiosResponse<Services.Common.Response>) => {
      // response data handler
      const { status, data } = res
      const HTTPCODE = [0, 200]
      if (HTTPCODE.includes(status) && HTTPCODE.includes(data.code)) return data
      ElMessage.error({ message: data.message })
      return Promise.reject(data.message)
    }, async (err: axios.AxiosError<Services.Common.Response>) => {
      ElMessage.error({ message: err.response?.data.message ?? '' })
      // request error handler
      return await Promise.reject(err.response?.data.message ?? '')
    })
  }

  /**
     * @method request
     * @param { Object } config
     * @return { ServerRes<U> }
    */
  @AuthGuard(exclude)
  @CatchError()
  async request<T, U> (config: axios.AxiosRequestConfig<T>): ServerRes<U> {
    return await this.instance.request<{}, ServerRes<U>, T>(config)
  }
}
