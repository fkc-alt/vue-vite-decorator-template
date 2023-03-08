import { Module } from '@/support/core'
import UploadService from '@/service/common/providers/upload.service'
import CommonModule from '../../common/common.module'
import UserModule from '../user/user.module'
import UserController from '../user/user.controller'
import OrderController from './order.controller'
import OrderService from './order.service'

@Module({
  imports: [UserModule, CommonModule],
  controllers: [OrderController, UserController],
  providers: [OrderService, UploadService],
  exports: [OrderService, UploadService]
})
export default class OrderModule { }
