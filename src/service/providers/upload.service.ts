import { AxiosRequestConfig } from 'axios'
import { Injectable } from '@/support/core'
import RequestService from './request.service'

@Injectable()
export default class UploadService {
  constructor (private readonly requestService: RequestService) { }
  public async send<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U>(configure: T): ServerRes<U> {
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
}
