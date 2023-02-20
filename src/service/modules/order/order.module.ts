import { Factory, Module } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import UtilService from '@/service/providers/util.service'
import UploadService from '@/service/providers/upload.service'
import OrderController from './order.controller'
import OrderService from './order.service'

@Module({
  controllers: [OrderController],
  providers: [RequestService, UtilService, OrderService, UploadService]
})
export default class OrderModule {
  constructor (readonly orderController: OrderController) {}
}

export const OrderModuleFactory = Factory(OrderModule)
