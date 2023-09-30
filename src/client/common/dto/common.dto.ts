import { IsNotEmpty, IsNumber } from 'class-validator'

export class Pagination implements Services.Common.Pagination {
  @IsNumber()
  @IsNotEmpty({ message: 'currentPage 不能为空' })
  currentPage!: number

  @IsNumber()
  @IsNotEmpty({ message: 'pageSize 不能为空' })
  pageSize!: number
}
