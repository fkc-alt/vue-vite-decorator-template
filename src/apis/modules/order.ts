import * as axios from 'axios'
import { Controller, Get, Post } from '@/descriptors/service'
import Service from '@/utils/service'

@Controller('order')
class OrderModel extends Service {
  @Get('orderDetail')
  async GetOrderDetail<T extends Service.OrderDetailReq, U = Service.OrderDetailRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.request<T, U>(param as axios.AxiosRequestConfig)
  }

  @Post('orderList')
  async GetOrderList<T extends Service.OrderListReq, U = Service.OrderListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.request<T, U>(param as axios.AxiosRequestConfig)
  }
}

export default new OrderModel()
