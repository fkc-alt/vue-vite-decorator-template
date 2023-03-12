import { Module } from '@/support/core'
import OrderController from './order.controller'
import OrderService from './order.service'

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export default class OrderModule { }