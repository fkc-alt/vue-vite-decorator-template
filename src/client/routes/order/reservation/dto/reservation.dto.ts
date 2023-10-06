import { Pagination } from '@/client/common/dto/common.dto'
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

enum ReservationUpdateState {
  IN_SERVICE = 'IN_SERVICE',
  FINISH = 'FINISH'
}

export class ReservationListDto
  extends Pagination
  implements Service.Order.ReservationListReq {}

// export class ReservationListDto
// extends Pagination
// implements Service.Order.ReservationListReq {}

export class ReservationUpdateStateDto
  implements Service.Order.ReservationUpdateStateReq
{
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number

  @IsEnum(ReservationUpdateState)
  @IsNotEmpty({ message: 'state 不能为空' })
  state!: 'IN_SERVICE' | 'FINISH'
}

export class ReservationDetailDto
  implements Service.Order.ReservationDetailReq
{
  @IsNumber()
  @IsNotEmpty({ message: 'id 不能为空' })
  id!: number
}
