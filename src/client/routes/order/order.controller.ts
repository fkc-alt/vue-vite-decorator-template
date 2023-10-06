import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { OrderService } from './order.service'
import { OrderListDto } from './dto/order.dto'

@Controller('order/v1')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @PostMapping('list')
  public async list<
    T extends Service.Order.OrderListReq,
    R extends Service.Order.OrderListRes
  >(configure: OrderListDto): Promise<Services.Common.Response<R>> {
    return await this.orderService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
