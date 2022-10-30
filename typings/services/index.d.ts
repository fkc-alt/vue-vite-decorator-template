declare namespace Services.Common {
  /**
     * @method Response
     * @descrption 请求返回类型
     */
  export interface Response<T = unknown> {
    readonly code: number | string
    readonly message: string
    data: T
  }
}
