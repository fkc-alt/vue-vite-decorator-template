import * as axios from 'axios'
import { Controller, Get, Post, ParamTypes } from '@/support/core'
import RequestService from '../providers/request.service'
import OrderService from './order.service'

@Controller('order')
@ParamTypes(RequestService, OrderService)
export default class OrderController {
  constructor (private readonly requestService: RequestService, private readonly orderService: OrderService) {}
  @Get('orderDetail')
  public async GetOrderDetail<T extends Service.OrderDetailReq, U = Service.OrderDetailRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    this.orderService.Log()
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }

  @Post('orderList')
  public async GetOrderList<T extends Service.OrderListReq, U = Service.OrderListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}
