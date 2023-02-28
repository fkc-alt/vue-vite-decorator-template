import { Type } from 'class-transformer'
import { IsNumber, IsNotEmpty, ArrayNotEmpty, ValidateNested, IsString } from 'class-validator'

class ArticleListParamDto {
  @IsString()
  @IsNotEmpty({ message: '标题 不能为空' })
  title!: string

  @IsNumber()
  @IsNotEmpty({ message: '状态 不能为空' })
  status!: number
}

export default class ArticleListDto implements Service.ArticleListReq {
  @ArrayNotEmpty()
  channel!: string[]

  @IsNumber()
  @IsNotEmpty({ message: 'pageSize 不能为空' })
  pageSize!: number

  @IsNumber()
  @IsNotEmpty({ message: 'currentPage 不能为空' })
  currentPage!: number

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ArticleListParamDto)
  param!: ArticleListParamDto
}
