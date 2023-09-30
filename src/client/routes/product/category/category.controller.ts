import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { CategoryService } from './category.service'
import { ProductAddDto } from './dto/category.dto'

@Controller('product/category/v1')
export class CateGoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @PostMapping('add')
  public async add<
    T extends Service.Product.ProductAddReq,
    R extends Service.Product.ProductAddRes
  >(configure: ProductAddDto): Promise<Services.Common.Response<R>> {
    return await this.categoryService.add<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
