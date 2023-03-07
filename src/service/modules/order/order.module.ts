import { Factory, Module } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import UtilService from '@/service/providers/util.service'
import UploadService from '@/service/providers/upload.service'
import UserModule from '../user/user.module'
import UserController from '../user/user.controller'
import OrderController from './order.controller'
import OrderService from './order.service'

@Module({
  imports: [UserModule],
  controllers: [OrderController, UserController],
  providers: [RequestService, UtilService, OrderService, UploadService],
  exports: [OrderService, UploadService]
})
export default class OrderModule {
  constructor (readonly orderController: OrderController, readonly orderService: OrderService, readonly userController: UserController) { }
}

export const OrderModuleFactory = Factory(OrderModule)
