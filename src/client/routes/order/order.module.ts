import { Module } from 'http-typedi'
import { ReservationModule } from './reservation'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [ReservationModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService, OrderController]
})
export class OrderModule {}
