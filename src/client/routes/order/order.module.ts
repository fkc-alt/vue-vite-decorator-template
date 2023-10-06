import { Module } from 'http-typedi'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService, OrderController]
})
export class OrderModule {}
