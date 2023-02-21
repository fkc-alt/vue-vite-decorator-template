import { AxiosRequestConfig } from 'axios'
import { Injectable } from '@/support/core'
import RequestService from './request.service'

@Injectable()
export default class UploadService {
  constructor (private readonly requestService: RequestService) { }
  public async uploadFile<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U>(configure: T): ServerRes<U> {
    const { data, ...reqJson } = configure
    const fileLoder = new FormData()
    fileLoder.append('file', data?.file.raw as Blob)
    return await this.requestService.request<T, U>({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: <any>fileLoder,
      ...reqJson
    })
  }

  public async uploadBase64<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U extends Services.Common.UplaodRes>(configure: T): ServerRes<U> {
    return await new Promise((resolve, reject) => {
      try {
        const { data, ...reqJson } = configure
        const filerender = new FileReader()
        filerender.onload = async (e: ProgressEvent<FileReader>) => {
          const base64 = (e.target?.result as string)?.split(',').pop()
          const ext = `.${data?.file.name.split('.').pop() as string}`
          const result = await this.requestService.request<T, U>({
            data: <any>{
              ext,
              base64
            },
            ...reqJson
          })
          resolve(result)
        }
        filerender.readAsDataURL(data?.file.raw as Blob)
      } catch (error) {
        reject(error)
      }
    })
  }
}
