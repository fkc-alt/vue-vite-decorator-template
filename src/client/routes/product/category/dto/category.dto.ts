import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Pagination } from '@/client/common/dto/common.dto'

export class AddCategoryDto implements Service.Product.AddCategoryReq {
  @IsString()
  @IsNotEmpty({ message: 'name 不能为空' })
  name!: string

  msg?: string | undefined
}

export class UpdateCategoryDto implements Service.Product.UpdateCategoryReq {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number

  @IsString()
  @IsNotEmpty({ message: 'name 不能为空' })
  name!: string

  msg?: string | undefined
}

export class CategoryListDto
  extends Pagination
  implements Service.Product.CategoryListReq
{
  name?: string
}

export class DelCategoryDto implements Service.Product.DelCategoryReq {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}
