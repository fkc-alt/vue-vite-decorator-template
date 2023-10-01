import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  ArrayNotEmpty
} from 'class-validator'
import { Enums } from '~@/typings/enums/product'
import { Pagination } from '@/client/common/dto/common.dto'

class PropertyDto implements Service.Product.PropertyItem {
  @IsEnum(Enums.ImageType)
  @IsNotEmpty({ message: 'name 不能为空' })
  name!: Enums.ImageType

  @IsNumber()
  @IsNotEmpty({ message: 'sortValue 不能为空' })
  sortValue!: number

  @IsString()
  @IsNotEmpty({ message: 'value 不能为空' })
  value!: string
}

export class ProductAddDto implements Service.Product.ProductAddReq {
  @IsNumber()
  @IsNotEmpty({ message: 'categoryId 不能为空' })
  categoryId!: number

  @IsString()
  @IsNotEmpty({ message: 'description 不能为空' })
  description!: string

  groupId?: number | undefined
  @IsString()
  @IsNotEmpty({ message: 'name 不能为空' })
  name!: string

  @Type(() => PropertyDto)
  @ArrayNotEmpty({ message: 'properties 不能为空' })
  properties!: PropertyDto[]

  @IsNumber()
  @IsNotEmpty({ message: 'sortValue 不能为空' })
  sortValue!: number
}

export class AddPropertiesDto implements Service.Product.AddPropertiesReq {
  @IsString()
  @IsNotEmpty({ message: 'name 不能为空' })
  name!: string

  @IsNumber()
  @IsNotEmpty({ message: 'productId 不能为空' })
  productId!: number

  @IsNumber()
  @IsNotEmpty({ message: 'sortValue 不能为空' })
  sortValue!: number

  @IsString()
  @IsNotEmpty({ message: 'value 不能为空' })
  value!: string
}

export class DelPropertiesDto implements Service.Product.DelPropertiesReq {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}

export class ProductListDto
  extends Pagination
  implements Service.Product.ProductListReq
{
  categoryId?: number | undefined
  groupId?: number | undefined
  name?: string | undefined
}
