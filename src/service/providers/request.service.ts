import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { AuthGuard, Injectable, CatchError } from '@/support/core'
import UtilService from './util.service'

const exclude = ['login', 'register']

/**
 * @author kaichao.Feng
*/
@Injectable()
export default class RequestService {
  private _instance!: AxiosInstance
  /**
     * @method constructor
     * @param { Object } config
    */
  constructor (private readonly utilService: UtilService) {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API
    })
  }

  /**
     * @method interceptorsReq
     * @return { Promise<AxiosRequestConfig | AxiosError> } Promise
    */
  private interceptorsReq (): void {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const Authorization = this.utilService.getToken()
      // before handler send request
      if (Authorization && config.headers) config.headers.Authorization = 'Bearer ' + Authorization
      return config
    }, async (err: AxiosError) => {
      // request error handler
      return await Promise.reject(err)
    })
  }

  /**
     * @method interceptorsRes
     * @return { Promise<AxiosResponse<Services.Common.Response> | AxiosError<Services.Common.Response>> } Promise
    */
  private interceptorsRes (): void {
    this.instance.interceptors.response.use((res: AxiosResponse<Services.Common.Response>) => {
      // response data handler
      const { status, data } = res
      const HTTPCODE = [0, 200]
      if (HTTPCODE.includes(status) && HTTPCODE.includes(data.code)) return data
      ElMessage.error({ message: data.message })
      return Promise.reject(data.message)
    }, async (err: AxiosError<Services.Common.Response>) => {
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
  public async request<T, U> (config: AxiosRequestConfig<T>): ServerRes<U> {
    return await this.instance.request<{}, ServerRes<U>, T>(config)
  }

  /**
     * @method forRoot
     * @param { AxiosRequestConfig } config
     * @description 传递配置参数
    */
  public forRoot (config: AxiosRequestConfig = {}): void {
    this.instance = axios.create(config)
  }

  /**
     * @method getters
     * @return { AxiosInstance } AxiosInstance
     * @description instance Getter
    */
  private get instance (): AxiosInstance {
    return this._instance
  }

  /**
     * @method setters
     * @description instance Setter
    */
  private set instance (axiosInstance: AxiosInstance) {
    this._instance = axiosInstance
    this.interceptorsReq()
    this.interceptorsRes()
  }
}
