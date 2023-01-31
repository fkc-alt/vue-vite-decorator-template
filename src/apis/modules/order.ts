import * as axios from 'axios'
import { Controller, Get, Post, ParamTypes } from '@/support/core'
import Service from '@/utils/service'

@Controller('order')
@ParamTypes(Service)
class OrderController {
  constructor (readonly service: Service) {}
  @Get('orderDetail')
  async GetOrderDetail<T extends Service.OrderDetailReq, U = Service.OrderDetailRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.service.request<T, U>(<axios.AxiosRequestConfig>param)
  }

  @Post('orderList')
  async GetOrderList<T extends Service.OrderListReq, U = Service.OrderListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.service.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}

export default OrderController
