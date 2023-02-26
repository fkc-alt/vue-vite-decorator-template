import { IsNotEmpty, IsNumber } from 'class-validator'

export class GetOrderListDto {
  @IsNumber()
  @IsNotEmpty({ message: 'pageSize不能为空' })
  pageSize!: number

  @IsNumber()
  @IsNotEmpty({ message: 'currentPage不能为空' })
  currentPage!: number
}
