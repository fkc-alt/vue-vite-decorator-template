import type { AxiosRequestConfig } from 'axios'
import UtilService from './util.service'
/**
 * @author kaichao.Feng
*/
export default class RequestService {
  private readonly utilService
  private readonly _instance
  /**
       * @method constructor
       * @param { Object } config
      */
  constructor (utilService: UtilService)
  /**
       * @method interceptorsReq
       * @return { Promise<AxiosRequestConfig | AxiosError> } Promise
      */
  private readonly interceptorsReq
  /**
       * @method interceptorsRes
       * @return { Promise<AxiosResponse<Services.Common.Response> | AxiosError<Services.Common.Response>> } Promise
      */
  private readonly interceptorsRes
  /**
       * @method request
       * @param { AxiosRequestConfig } config
       * @return { ServerRes<U> }
      */
  request<T, U>(config: AxiosRequestConfig<T>): ServerRes<U>
  /**
       * @method forRoot
       * @param { AxiosRequestConfig } config
       * @description Set Configure
      */
  forRoot (config?: AxiosRequestConfig): void
  /**
       * @method getters
       * @return { AxiosInstance } AxiosInstance
       * @description instance Getter
      */
  private get instance ()
  /**
       * @method setters
       * @description instance Setter
      */
  private set instance (value)
}
