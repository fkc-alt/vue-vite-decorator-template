import { IsNotEmpty, IsString } from 'class-validator'
import { Pagination } from '@/client/common/dto/common.dto'

export class OrderListDto
  extends Pagination
  implements Service.Order.OrderListReq {}

export class OrderPperateLogDto implements Service.Order.OrderPperateLogReq {
  @IsString()
  @IsNotEmpty({ message: 'orderId 不能为空' })
  orderId!: string
}
