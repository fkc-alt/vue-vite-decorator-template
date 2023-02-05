import type { AxiosRequestConfig } from 'axios'
import { Controller, Get, Post } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import OrderService from './order.service'

@Controller('order')
export default class OrderController {
  constructor (private readonly requestService: RequestService, private readonly orderService: OrderService) {}
  @Get('orderDetail')
  public async GetOrderDetail<T extends Service.OrderDetailReq, U = Service.OrderDetailRes>(param: T): ServerRes<U> {
    this.orderService.Log()
    return await this.requestService.request<T, U>(<AxiosRequestConfig>param)
  }

  @Post('orderList')
  public async GetOrderList<T extends Service.OrderListReq, U = Service.OrderListRes>(param: T): ServerRes<U> {
    return await this.requestService.request<T, U>(<AxiosRequestConfig>param)
  }
}
