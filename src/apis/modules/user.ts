import * as axios from 'axios'
import { Controller, Post } from '@/descriptors/service'
import Service from '@/utils/service'

@Controller('user')
class UserModel extends Service {
  @Post('login')
  async Login<T extends Service.LoginReq, U extends Service.LoginRes>(param: axios.AxiosRequestConfig | T): ServerRes<U> {
    return await this.request<T, U>(param as axios.AxiosRequestConfig)
  }
}

export default new UserModel()
