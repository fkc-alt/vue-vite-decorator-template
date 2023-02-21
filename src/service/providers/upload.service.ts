import { AxiosRequestConfig } from 'axios'
import { Injectable } from '@/support/core'
import RequestService from './request.service'

@Injectable()
export default class UploadService {
  constructor (private readonly requestService: RequestService) { }

  public async uploadFile<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U = Services.Common.UplaodRes>(configure: T): ServerRes<U> {
    const { data, ...reqJson } = configure
    const fileLoder = new FormData()
    fileLoder.append('file', data?.file.raw as Blob)
    return await this.requestService.request<T, U>({
      ...reqJson,
      data: <T><unknown>fileLoder,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  public async uploadBase64<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U = Services.Common.UplaodRes>(configure: T): ServerRes<U> {
    type UploadFile = Services.Common.UplaodReq extends { file: infer U } ? U : never
    return await new Promise((resolve, reject) => {
      try {
        const { data, ...reqJson } = configure
        const filerender = new FileReader()
        filerender.onload = async (e: ProgressEvent<FileReader>) => {
          const base64 = (e.target?.result as string)?.split(',').pop() ?? ''
          const ext = `.${<string>((<UploadFile>data?.file).name.split('.').pop())}`
          const result = await this.requestService.request<T, U>({ ...reqJson, data: <T><unknown>{ ext, base64 } })
          resolve(result)
        }
        filerender.readAsDataURL((<UploadFile>data?.file).raw as Blob)
      } catch (error) {
        reject(error)
      }
    })
  }
}
