import { Factory, Module } from '@/support/core'
import OrderController from './order.controller'
import RequestService from '../providers/request.service'
import UtilService from '../providers/util.service'
import OrderService from './order.service'

@Module({
  controllers: [OrderController],
  providers: [RequestService, UtilService, OrderService]
})
export default class OrderModule {
  constructor (readonly OrderController: OrderController) {}
}

export const OrderModuleFactory = Factory(OrderModule)
