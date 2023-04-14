import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig
  // AxiosError
  // AxiosResponse
} from 'axios'
import { Injectable } from '@/support/core'
import UtilService from './util.service'
import Auth from '../decorators/request.decorators'

const exclude = ['login', 'register']

/**
 * @author kaichao.Feng
 */
@Injectable()
export default class RequestService {
  private _instance!: AxiosInstance
  /**
   * @method constructor
   * @param { UtilService } UtilService
   */
  constructor(private readonly utilService: UtilService) {
    // this.forRoot({ baseURL: import.meta.env.VITE_APP_BASE_API })
    this.forRoot()
  }

  /**
   * @method interceptorsReq
   * @return { Promise<AxiosRequestConfig | AxiosError> } Promise
   * @description Override Request InterceptorsReq
   */
  private interceptorsReq(): void {
    // this.instance.interceptors.request.use(
    //   (config: AxiosRequestConfig) => {
    //     const Authorization = this.utilService.getToken()
    //     // before handler send request
    //     if (Authorization && config.headers)
    //       config.headers.Authorization = `Bearer ${Authorization}`
    //     return config
    //   },
    //   async (err: AxiosError) => {
    //     // request error handler
    //     return await Promise.reject(err)
    //   }
    // )
  }

  /**
   * @method interceptorsRes
   * @return { Promise<AxiosResponse<Services.Common.Response> | AxiosError<Services.Common.Response>> } Promise
   * @description Override Request interceptorsRes
   */
  private interceptorsRes(): void {
    // this.instance.interceptors.response.use(
    //   async (res: AxiosResponse<Services.Common.Response>) => {
    //     // response data handler
    //     const { status, data } = res
    //     const HTTPCODE = [0, 200]
    //     if (HTTPCODE.includes(status) && HTTPCODE.includes(data.code))
    //       return data
    //     ElMessage.error({ message: data.message })
    //     return await Promise.reject(data.message)
    //   },
    //   async (err: AxiosError<Services.Common.Response>) => {
    //     ElMessage.error({ message: err.response?.data.message ?? '' })
    //     // request error handler
    //     return await Promise.reject(err.response?.data.message ?? '')
    //   }
    // )
  }

  /**
   * @method request
   * @param { AxiosRequestConfig } AxiosRequestConfig
   * @return { ServerRes<U> } ServerRes<U>
   */
  @Auth(exclude)
  public async request<T, U>(config: AxiosRequestConfig<T>): ServerRes<U> {
    return await this.instance.request<{}, ServerRes<U>, T>(config)
  }

  /**
   * @method forRoot
   * @param { AxiosRequestConfig } AxiosRequestConfig
   * @description Set Configure
   */
  public forRoot(config: AxiosRequestConfig = {}): void {
    this.instance = axios.create(config)
  }

  /**
   * @method getters
   * @return { AxiosInstance } AxiosInstance
   * @description instance Getter
   */
  private get instance(): AxiosInstance {
    return this._instance
  }

  /**
   * @method setters
   * @description instance Setter
   */
  private set instance(axiosInstance: AxiosInstance) {
    this._instance = axiosInstance
    this.interceptorsReq()
    this.interceptorsRes()
  }
}
