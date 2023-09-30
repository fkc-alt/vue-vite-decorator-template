import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Pagination } from '@/client/common/dto/common.dto'

class CommonDto {
  @IsNumber()
  @IsNotEmpty({ message: 'sortValue 不能为空' })
  sortValue!: number

  @IsString()
  @IsNotEmpty({ message: 'name 不能为空' })
  name!: string
}

export class AddGroupDto
  extends CommonDto
  implements Service.Product.AddGroupReq {}

export class UpdateGroupDto
  extends CommonDto
  implements Service.Product.UpdateGroupReq
{
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number

  msg?: string | undefined
}

export class GroupListDto
  extends Pagination
  implements Service.Product.GroupListReq
{
  name?: string
}

export class DelGroupDto implements Service.Product.DelGroupReq {
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}
