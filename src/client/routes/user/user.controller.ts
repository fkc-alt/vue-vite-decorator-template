import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { UserService } from './user.service'
import { LoginDto } from './dto/login.dto'

@Controller('v1')
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
}
