import * as axios from 'axios'
import { Controller, Post, ParamTypes } from '@/support/core'
import Service from '@/service/providers/service.provider'
@Controller('user')
@ParamTypes(Service)
class UserController {
  constructor (readonly service: Service) {}
  @Post('login')
  async Login<T extends Service.LoginReq, U extends Service.LoginRes>(param: axios.AxiosRequestConfig | T): ServerRes<U> {
    return await this.service.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}

export default UserController
