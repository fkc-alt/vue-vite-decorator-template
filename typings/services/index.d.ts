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
  export interface UplaodReq {
    file: import('element-plus').UploadFile
  }
  export interface UplaodRes {
    url: string
  }
  export interface UplaodBase64Req extends Partial<UplaodReq> {
    ext: string
    base64: string
  }
}

declare type ServerRes<T, U = Promise> = U extends Promise ? Promise<Services.Common.Response<T>> : Services.Common.Response<T>
