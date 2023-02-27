import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'

class Child {
  @IsNumber()
  @IsNotEmpty()
  test!: number
}

@Reflect.metadata('child', Child)
class Demo {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  age!: string

  @ValidateNested()
  child!: Child
}

@Reflect.metadata('demo', Demo)
export default class ArticleListDto implements Service.ArticleListReq {
  @IsNumber({}, { message: 'currentPage 类型为number' })
  @IsNotEmpty({ message: 'currentPage 不能为空' })
  currentPage!: number

  @IsNumber()
  @IsNotEmpty({ message: 'pageSize 不能为空' })
  pageSize!: number

  @ValidateNested()
  demo!: Demo
}
