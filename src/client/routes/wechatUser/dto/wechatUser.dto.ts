import { Pagination } from '@/client/common/dto/common.dto'

export class WechatUserListDto
  extends Pagination
  implements Service.WechatUser.WechatUserListReq {}
