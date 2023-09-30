import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { GroupService } from './group.service'
import {
  AddGroupDto,
  DelGroupDto,
  GroupListDto,
  UpdateGroupDto
} from './dto/group.dto'

@Controller('product/group/v1')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @PostMapping('add')
  public async add<
    T extends Service.Product.AddGroupReq,
    R extends Service.Product.AddGroupRes
  >(configure: AddGroupDto): Promise<Services.Common.Response<R>> {
    return await this.groupService.add<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('update')
  public async update<
    T extends Service.Product.UpdateGroupReq,
    R extends Service.Product.UpdateGroupRes
  >(configure: UpdateGroupDto): Promise<Services.Common.Response<R>> {
    return await this.groupService.update<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('delete')
  public async del<
    T extends Service.Product.DelGroupReq,
    R extends Service.Product.DelGroupRes
  >(configure: DelGroupDto): Promise<Services.Common.Response<R>> {
    return await this.groupService.delete<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('list')
  public async list<
    T extends Service.Product.GroupListReq,
    R extends Service.Product.GroupListRes
  >(configure: GroupListDto): Promise<Services.Common.Response<R>> {
    return await this.groupService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
