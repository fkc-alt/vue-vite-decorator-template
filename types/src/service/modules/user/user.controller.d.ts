import RequestService from '@/service/common/providers/request.service'
import UserService from './user.service'
import LoginDto from './dto/login.dto'
import UserInfoDto from './dto/userInfo.dto'
export default class UserController {
  private readonly requestService
  private readonly userService
  constructor (requestService: RequestService, userService: UserService)
  Login<T extends Service.LoginReq, U extends Service.LoginRes>(configure: LoginDto): ServerRes<U>
  UserInfo<T extends Service.UserInfoReq, U extends Service.UserInfoRes>(configure: UserInfoDto): ServerRes<U>
}
