import RequestService from '@/service/common/providers/request.service'
import UploadService from '@/service/common/providers/upload.service'
import OrderService from './order.service'
import GetOrderListDto from './dto/orderList.dto'
import GetOrderDetailDto from './dto/orderDetail.dto'
export default class OrderController {
  private readonly requestService
  private readonly orderService
  private readonly uploadService
  constructor (requestService: RequestService, orderService: OrderService, uploadService: UploadService)
  GetOrderDetail<T extends Service.OrderDetailReq, U extends Service.OrderDetailRes>(configure: GetOrderDetailDto): ServerRes<U>
  GetOrderList<T extends Service.OrderListReq, U extends Service.OrderListRes>(configure: GetOrderListDto): ServerRes<U>
  UploadFile<T extends Services.Common.UplaodReq, U extends Services.Common.UplaodRes>(configure: T): ServerRes<U>
  UploadBase64<T extends Services.Common.UplaodReq, U extends Services.Common.UplaodRes>(configure: T): ServerRes<U>
}
