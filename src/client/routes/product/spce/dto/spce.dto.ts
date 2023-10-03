import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Pagination } from '@/client/common/dto/common.dto'

export class CommonDto {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}

export class SpceShelveDto
  extends CommonDto
  implements Service.Product.SpceShelveReq {}

export class SpceOffShelveDto
  extends CommonDto
  implements Service.Product.SpceOffShelveReq {}

export class SpceOffShelveBatchDto
  extends CommonDto
  implements Service.Product.SpceOffShelveBatchReq {}

export class SpceShelveBatchDto
  extends CommonDto
  implements Service.Product.SpceShelveBatchReq {}

export class AddSpceDto implements Service.Product.AddSpceReq {
  @IsNumber()
  @IsNotEmpty({ message: 'originalAmount 不能为空' })
  originalAmount!: number

  pid?: number | undefined
  @IsNumber()
  @IsNotEmpty({ message: 'productId 不能为空' })
  productId!: number

  @IsNumber()
  @IsNotEmpty({ message: 'shelvesStock 不能为空' })
  shelvesStock!: number

  @IsString()
  @IsNotEmpty({ message: 'specsName 不能为空' })
  specsName!: string

  @IsNumber()
  @IsNotEmpty({ message: 'totalStock 不能为空' })
  totalStock!: number
}

export class UpdateSpceDto
  extends AddSpceDto
  implements Service.Product.UpdateSpceReq
{
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}

export class SpceListDto
  extends Pagination
  implements Service.Product.SpceListReq
{
  name?: string
  categoryId?: number
  groupId?: number
}

export class DelGroupDto implements Service.Product.DelGroupReq {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}

export class DelSpceDto implements Service.Product.DelSpceReq {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}
