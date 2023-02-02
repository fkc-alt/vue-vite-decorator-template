import Axios, * as axios from 'axios'
import { ElMessage } from 'element-plus'
import { AuthGuard, Injectable, CatchError } from '@/support/core'
import UtilService from './util.service'

const exclude = ['login', 'register']

/**
 * @author kaichao.Feng
*/
@Injectable()
export default class RequestService {
  private _instance!: axios.AxiosInstance
  /**
     * @method constructor
     * @param { Object } config
    */
  constructor (private readonly utilService: UtilService) {
    this.instance = Axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API
    })
  }

  /**
     * @method interceptorsReq
     * @return { Promise<axios.AxiosRequestConfig | axios.AxiosError> } Promise
    */
  private interceptorsReq (): void {
    this.instance.interceptors.request.use((config: axios.AxiosRequestConfig) => {
      const Authorization = this.utilService.getToken()
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
  public async request<T, U> (config: axios.AxiosRequestConfig<T>): ServerRes<U> {
    return await this.instance.request<{}, ServerRes<U>, T>(config)
  }

  /**
     * @method forRoot
     * @param { axios.AxiosRequestConfig } config
     * @description 传递配置参数
    */
  public forRoot (config: axios.AxiosRequestConfig = {}): void {
    this.instance = Axios.create(config)
  }

  /**
     * @method getters
     * @return { axios.AxiosInstance }
     * @description instance Getter
    */
  private get instance (): axios.AxiosInstance {
    return this._instance
  }

  /**
     * @method setters
     * @return { axios.AxiosInstance }
     * @description instance Setter
    */
  private set instance (axiosInstance: axios.AxiosInstance) {
    this._instance = axiosInstance
    this.interceptorsReq()
    this.interceptorsRes()
  }
}