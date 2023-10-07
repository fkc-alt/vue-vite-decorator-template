import { Module } from 'http-typedi'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { ReservationHelperController } from './helper/helper.controller'

@Module({
  imports: [],
  controllers: [ReservationController, ReservationHelperController],
  providers: [ReservationService],
  exports: [
    ReservationService,
    ReservationController,
    ReservationHelperController
  ]
})
export class ReservationModule {}
