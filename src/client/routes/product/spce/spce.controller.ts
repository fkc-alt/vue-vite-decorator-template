import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { SpceService } from './spce.service'
import {
  AddSpceDto,
  DelSpceDto,
  SpceListDto,
  UpdateSpceDto,
  SpceShelveDto,
  SpceOffShelveDto,
  SpceOffShelveBatchDto,
  SpceShelveBatchDto
} from './dto/spce.dto'

@Controller('product/spces/v1')
export class SpceController {
  constructor(private readonly spceService: SpceService) {}

  @PostMapping('add')
  public async add<
    T extends Service.Product.AddSpceReq,
    R extends Service.Product.AddSpceRes
  >(configure: AddSpceDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.add<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('update')
  public async update<
    T extends Service.Product.UpdateSpceReq,
    R extends Service.Product.UpdateSpceRes
  >(configure: UpdateSpceDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.update<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('delete')
  public async del<
    T extends Service.Product.DelSpceReq,
    R extends Service.Product.DelSpceRes
  >(configure: DelSpceDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.delete<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('list')
  public async list<
    T extends Service.Product.SpceListReq,
    R extends Service.Product.SpceListRes
  >(configure: SpceListDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('shelve')
  public async shelve<
    T extends Service.Product.SpceShelveReq,
    R extends Service.Product.SpceShelveRes
  >(configure: SpceShelveDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.shelve<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('off-shelve')
  public async offShelve<
    T extends Service.Product.SpceOffShelveReq,
    R extends Service.Product.SpceOffShelveRes
  >(configure: SpceOffShelveDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.offShelve<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('shelve/batch')
  public async shelveBatch<
    T extends Service.Product.SpceShelveBatchReq,
    R extends Service.Product.SpceShelveBatchRes
  >(configure: SpceShelveBatchDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.shelveBatch<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('off-shelve/batch')
  public async offShelveBatch<
    T extends Service.Product.SpceOffShelveBatchReq,
    R extends Service.Product.SpceOffShelveBatchRes
  >(configure: SpceOffShelveBatchDto): Promise<Services.Common.Response<R>> {
    return await this.spceService.offShelveBatch<
      T,
      Services.Common.Response<R>
    >(<RequestConfig<T>>configure)
  }
}
