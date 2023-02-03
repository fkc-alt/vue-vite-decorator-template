import * as axios from 'axios'
import { Controller, Post } from '@/support/core'
import RequestService from '../../providers/request.service'
import UserService from './user.service'

@Controller('user')
export default class UserController {
  constructor (private readonly requestService: RequestService, private readonly userService: UserService) {}
  @Post('login')
  public async Login<T extends Service.LoginReq, U extends Service.LoginRes>(data: T): ServerRes<U> {
    this.userService.Log()
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>data)
  }
}
