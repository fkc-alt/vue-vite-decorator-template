import * as axios from 'axios'
import { Controller, Get, Post, ParamTypes } from '@/support/core'
import RequestService from '../providers/request.provider'

@Controller('order')
@ParamTypes(RequestService)
export default class OrderController {
  constructor (private readonly requestService: RequestService) {}
  @Get('orderDetail')
  async GetOrderDetail<T extends Service.OrderDetailReq, U = Service.OrderDetailRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }

  @Post('orderList')
  async GetOrderList<T extends Service.OrderListReq, U = Service.OrderListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}
