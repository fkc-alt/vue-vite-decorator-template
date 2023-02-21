import type { AxiosRequestConfig } from 'axios'
import { Controller, Get, Post } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import UploadService from '@/service/providers/upload.service'
import OrderService from './order.service'

@Controller('order')
export default class OrderController {
  constructor (private readonly requestService: RequestService, private readonly orderService: OrderService, private readonly uploadService: UploadService) {}
  @Get('orderDetail')
  public async GetOrderDetail<T extends Service.OrderDetailReq, U extends Service.OrderDetailRes>(configure: T): ServerRes<U> {
    this.orderService.Log()
    return await this.requestService.request<T, U>(<AxiosRequestConfig>configure)
  }

  @Post('orderList')
  public async GetOrderList<T extends Service.OrderListReq, U extends Service.OrderListRes>(configure: T): ServerRes<U> {
    return await this.requestService.request<T, U>(<AxiosRequestConfig>configure)
  }

  @Post('uploadFile')
  public async uploadFile<T extends Services.Common.UplaodReq, U extends Services.Common.UplaodReq>(configure: T): ServerRes<U> {
    return await this.uploadService.uploadFile<AxiosRequestConfig<T>, U>(<AxiosRequestConfig>configure)
  }

  @Post('uploadBase64')
  public async UploadBase64<T extends Services.Common.UplaodReq, U extends Services.Common.UplaodRes>(configure: T): ServerRes<U> {
    return await this.uploadService.uploadBase64<AxiosRequestConfig<T>, U>(<AxiosRequestConfig<T>>configure)
  }
}
