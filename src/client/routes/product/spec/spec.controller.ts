import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { SpecService } from './spec.service'
import {
  AddSpecDto,
  DelSpecDto,
  SpecListDto,
  UpdateSpecDto,
  SpecShelveDto,
  SpecOffShelveDto,
  SpecOffShelveBatchDto,
  SpecShelveBatchDto
} from './dto/spce.dto'

@Controller('product/specs/v1')
export class SpecController {
  constructor(private readonly specService: SpecService) {}

  @PostMapping('add')
  public async add<
    T extends Service.Product.AddSpecReq,
    R extends Service.Product.AddSpecRes
  >(configure: AddSpecDto): Promise<Services.Common.Response<R>> {
    return await this.specService.add<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('update')
  public async update<
    T extends Service.Product.UpdateSpecReq,
    R extends Service.Product.UpdateSpecRes
  >(configure: UpdateSpecDto): Promise<Services.Common.Response<R>> {
    return await this.specService.update<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('delete')
  public async del<
    T extends Service.Product.DelSpecReq,
    R extends Service.Product.DelSpecRes
  >(configure: DelSpecDto): Promise<Services.Common.Response<R>> {
    return await this.specService.delete<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('list')
  public async list<
    T extends Service.Product.SpecListReq,
    R extends Service.Product.SpecListRes
  >(configure: SpecListDto): Promise<Services.Common.Response<R>> {
    return await this.specService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('shelve')
  public async shelve<
    T extends Service.Product.SpecShelveReq,
    R extends Service.Product.SpecShelveRes
  >(configure: SpecShelveDto): Promise<Services.Common.Response<R>> {
    return await this.specService.shelve<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('off-shelve')
  public async offShelve<
    T extends Service.Product.SpecOffShelveReq,
    R extends Service.Product.SpecOffShelveRes
  >(configure: SpecOffShelveDto): Promise<Services.Common.Response<R>> {
    return await this.specService.offShelve<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('shelve/batch')
  public async shelveBatch<
    T extends Service.Product.SpecShelveBatchReq,
    R extends Service.Product.SpecShelveBatchRes
  >(configure: SpecShelveBatchDto): Promise<Services.Common.Response<R>> {
    return await this.specService.shelveBatch<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('off-shelve/batch')
  public async offShelveBatch<
    T extends Service.Product.SpecOffShelveBatchReq,
    R extends Service.Product.SpecOffShelveBatchRes
  >(configure: SpecOffShelveBatchDto): Promise<Services.Common.Response<R>> {
    return await this.specService.offShelveBatch<
      T,
      Services.Common.Response<R>
    >(<RequestConfig<T>>configure)
  }
}
