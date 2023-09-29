import { Controller, GetMapping, PostMapping, RequestConfig } from 'http-typedi'
import { UserService } from './user.service'
import { LoginDto } from './dto/login.dto'
import { UserInfoDto } from './dto/userInfo.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PostMapping('login')
  public async login<T extends Service.LoginReq, R extends Service.LoginRes>(
    configure: LoginDto
  ): Promise<Services.Common.Response<R>> {
    return await this.userService.login<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @GetMapping('info')
  public async getUserInfo<
    T extends Service.UserInfoReq,
    R extends Service.UserInfoRes
  >(configure: UserInfoDto): Promise<Services.Common.Response<R>> {
    return await this.userService.getUserInfo<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
