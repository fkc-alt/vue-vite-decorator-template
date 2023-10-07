import {
  Controller,
  PostMapping,
  RequestConfig,
  RequestService
} from 'http-typedi'
import {
  OrderAddressDetailDto,
  GetOrderGoodsListDto
} from '../dto/reservation.dto'

@Controller('/order')
export class ReservationHelperController {
  constructor(private readonly requestService: RequestService) {}

  @PostMapping('address/v1/detail')
  public async getOrderAddressDetail<
    T extends Service.Order.OrderAddressDetailReq,
    R extends Service.Order.OrderAddressDetailRes
  >(configure: OrderAddressDetailDto): Promise<Services.Common.Response<R>> {
    return await this.requestService.request<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('commodity/v1/list')
  public async getOrderGoodsList<
    T extends Service.Order.GetOrderGoodsListReq,
    R extends Service.Order.GetOrderGoodsListRes
  >(configure: GetOrderGoodsListDto): Promise<Services.Common.Response<R>> {
    return await this.requestService.request<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
