import { Pagination } from '@/client/common/dto/common.dto'

export class OrderListDto
  extends Pagination
  implements Service.Order.OrderListReq {}
