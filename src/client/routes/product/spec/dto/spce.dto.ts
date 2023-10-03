import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Pagination } from '@/client/common/dto/common.dto'

export class CommonDto {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}

export class SpecShelveDto
  extends CommonDto
  implements Service.Product.SpecShelveReq {}

export class SpecOffShelveDto
  extends CommonDto
  implements Service.Product.SpecOffShelveReq {}

export class SpecOffShelveBatchDto
  extends CommonDto
  implements Service.Product.SpecOffShelveBatchReq {}

export class SpecShelveBatchDto
  extends CommonDto
  implements Service.Product.SpecShelveBatchReq {}

export class AddSpecDto implements Service.Product.AddSpecReq {
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

export class UpdateSpecDto
  extends AddSpecDto
  implements Service.Product.UpdateSpecReq
{
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}

export class SpecListDto
  extends Pagination
  implements Service.Product.SpecListReq
{
  name?: string
  categoryId?: number
  groupId?: number
}

export class DelSpecDto implements Service.Product.DelSpecReq {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}
