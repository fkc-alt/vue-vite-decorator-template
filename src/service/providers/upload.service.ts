import { AxiosRequestConfig } from 'axios'
import { Injectable } from '@/support/core'
import RequestService from './request.service'

@Injectable()
export default class UploadService {
  constructor (private readonly requestService: RequestService) { }

  public async uploadFile<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U = Services.Common.UplaodRes>(configure: T): ServerRes<U> {
    const { data: { file, ...params } = { }, ...reqJson } = configure
    const fileLoder = new FormData()
    fileLoder.append('file', <Blob>file?.raw)
    return await this.requestService.request<Services.Common.UplaodFileReq, U>({
      ...reqJson,
      data: { file: <FormDataEntryValue>fileLoder.get('file'), ...(params || {}) },
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  public async uploadBase64<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U = Services.Common.UplaodRes>(configure: T): ServerRes<U> {
    type UploadFile = Services.Common.UplaodReq extends { file: infer U } ? U : never
    return await new Promise((resolve, reject) => {
      try {
        const { data: { file, ...params } = {}, ...reqJson } = configure
        const render = new FileReader()
        render.onload = (e: ProgressEvent<FileReader>) => {
          const base64 = (<string>e.target?.result)?.split(',').pop() ?? ''
          const ext = `.${<string>((<UploadFile>file).name.split('.').pop())}`
          resolve(this.requestService.request<Services.Common.UplaodBase64Req, U>({ ...reqJson, data: { base64, ext, ...(params || {}) } }))
        }
        render.readAsDataURL(<Blob>(<UploadFile>file).raw)
      } catch (error) {
        reject(error)
      }
    })
  }
}
