import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { WechatUserService } from './wechatUser.service'
import { WechatUserListDto } from './dto/wechatUser.dto'

@Controller('wechat/user/v1')
export class WechatUserController {
  constructor(private readonly wechatUserService: WechatUserService) {}

  @PostMapping('list')
  public async list<
    T extends Service.WechatUser.WechatUserListReq,
    R extends Service.WechatUser.WechatUserListRes
  >(configure: WechatUserListDto) {
    return await this.wechatUserService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
