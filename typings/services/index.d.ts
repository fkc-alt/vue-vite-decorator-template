declare namespace Services.Common {
  /**
     * @method Response
     * @descrption 请求返回类型
     */
  export interface Response<T = unknown> {
    readonly code: number
    readonly message: string
    data: T
  }
}

declare type ServerRes<T, U = Promise> = U extends Promise ? Promise<Services.Common.Response<T>> : Services.Common.Response<T>
