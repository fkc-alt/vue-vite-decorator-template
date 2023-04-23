import type { AxiosRequestConfig } from 'axios'
import { Controller, Get, Post } from 'http-typedi'
import RequestService from '@/service/common/providers/request.service'
import { Route } from '..'
import UserService from './user.service'
import LoginDto from './dto/login.dto'
import UserInfoDto from './dto/userInfo.dto'

@Controller(Route.USER)
export default class UserController {
  constructor(
    private readonly requestService: RequestService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  public async Login<T extends Service.LoginReq, U extends Service.LoginRes>(
    configure: LoginDto
  ): ServerRes<U> {
    this.userService.Log()
    return await this.requestService.request<T, U>(
      <AxiosRequestConfig>configure
    )
  }

  @Get('info/:id/:phone')
  public async UserInfo<
    T extends Service.UserInfoReq,
    U extends Service.UserInfoRes
  >(configure: UserInfoDto): ServerRes<U> {
    return await this.requestService.request<T, U>(
      <AxiosRequestConfig>configure
    )
  }
}
