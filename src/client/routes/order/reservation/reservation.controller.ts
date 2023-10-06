import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { ReservationService } from './reservation.service'
import {
  ReservationListDto,
  ReservationUpdateStateDto,
  ReservationDetailDto
} from './dto/reservation.dto'

@Controller('order/reservation/v1')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @PostMapping('list')
  public async list<
    T extends Service.Order.ReservationListReq,
    R extends Service.Order.ReservationListRes
  >(configure: ReservationListDto): Promise<Services.Common.Response<R>> {
    return await this.reservationService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('update/state')
  public async updateState<
    T extends Service.Order.ReservationUpdateStateReq,
    R extends Service.Order.ReservationUpdateStateReq
  >(
    configure: ReservationUpdateStateDto
  ): Promise<Services.Common.Response<R>> {
    return await this.reservationService.updateState<
      T,
      Services.Common.Response<R>
    >(<RequestConfig<T>>configure)
  }

  @PostMapping('detail')
  public async detail<
    T extends Service.Order.ReservationDetailReq,
    R extends Service.Order.ReservationDetailRes
  >(configure: ReservationDetailDto): Promise<Services.Common.Response<R>> {
    return await this.reservationService.detail<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
