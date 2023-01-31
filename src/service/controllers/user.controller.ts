import * as axios from 'axios'
import { Controller, Post, ParamTypes } from '@/support/core'
import RequestService from '../providers/request.provider'

@Controller('user')
@ParamTypes(RequestService)
export default class UserController {
  constructor (private readonly requestService: RequestService) {}
  @Post('login')
  async Login<T extends Service.LoginReq, U extends Service.LoginRes>(param: axios.AxiosRequestConfig | T): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}
