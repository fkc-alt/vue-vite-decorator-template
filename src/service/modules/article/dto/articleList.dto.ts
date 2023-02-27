import { IsNotEmpty, IsNumber } from 'class-validator'

export default class ArticleListDto implements Service.ArticleListReq {
  @IsNumber({}, { message: 'currentPage 类型为number' })
  @IsNotEmpty({ message: 'currentPage 不能为空' })
  currentPage!: number

  @IsNumber()
  @IsNotEmpty({ message: 'pageSize 不能为空' })
  pageSize!: number
}
