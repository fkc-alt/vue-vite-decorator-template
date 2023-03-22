import { AxiosRequestConfig } from 'axios'
import RequestService from './request.service'
export default class UploadService {
  private readonly requestService
  constructor (requestService: RequestService)
  uploadFile<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U = Services.Common.UplaodRes>(configure: T): ServerRes<U>
  uploadBase64<T extends AxiosRequestConfig<Services.Common.UplaodReq>, U = Services.Common.UplaodRes>(configure: T): ServerRes<U>
}
