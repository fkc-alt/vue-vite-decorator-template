import * as axios from 'axios'
import { Controller, Injectable, Post } from '@/descriptors/service'
import Service from '@/utils/service'
import { ParamTypes } from '@/descriptors/demo'

@Controller('user')
@Injectable()
@ParamTypes(Service)
class UserController {
  constructor (readonly service: Service) {}
  @Post('login')
  async Login<T extends Service.LoginReq, U extends Service.LoginRes>(param: axios.AxiosRequestConfig | T): ServerRes<U> {
    return await this.service.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}

export default UserController
