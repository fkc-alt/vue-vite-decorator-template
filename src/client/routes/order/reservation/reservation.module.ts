import { Module } from 'http-typedi'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService, ReservationController]
})
export class ReservationModule {}
