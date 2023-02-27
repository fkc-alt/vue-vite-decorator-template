import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class GetOrderListDto implements Service.OrderListReq {
  @IsNumber()
  @IsNotEmpty({ message: 'pageSize 不能为空' })
  pageSize!: number

  @IsNumber()
  @IsNotEmpty({ message: 'currentPage 不能为空' })
  currentPage!: number
}

export class GetOrderDetailDto implements Service.OrderDetailReq {
  @IsString()
  @IsNotEmpty({ message: 'orderId 不能为空' })
  orderId!: string
}
