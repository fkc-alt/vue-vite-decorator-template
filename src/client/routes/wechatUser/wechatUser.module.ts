import { Module } from 'http-typedi'
import { WechatUserController } from './wechatUser.controller'
import { WechatUserService } from './wechatUser.service'

@Module({
  imports: [],
  controllers: [WechatUserController],
  providers: [WechatUserService],
  exports: [WechatUserService, WechatUserController]
})
export class WechatUserModule {}
