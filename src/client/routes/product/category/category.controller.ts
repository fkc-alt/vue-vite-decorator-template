import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { CategoryService } from './category.service'
import {
  AddCategoryDto,
  UpdateCategoryDto,
  CategoryListDto,
  DelCategoryDto
} from './dto/category.dto'

@Controller('product/category/v1')
export class CateGoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @PostMapping('add')
  public async add<
    T extends Service.Product.AddCategoryReq,
    R extends Service.Product.AddCategoryRes
  >(configure: AddCategoryDto): Promise<Services.Common.Response<R>> {
    return await this.categoryService.add<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('update')
  public async update<
    T extends Service.Product.UpdateCategoryReq,
    R extends Service.Product.UpdateCategoryRes
  >(configure: UpdateCategoryDto): Promise<Services.Common.Response<R>> {
    return await this.categoryService.update<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('list')
  public async list<
    T extends Service.Product.DelCategoryReq,
    R extends Service.Product.DelCategoryRes
  >(configure: CategoryListDto): Promise<Services.Common.Response<R>> {
    return await this.categoryService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('delete')
  public async del<
    T extends Service.Product.DelCategoryReq,
    R extends Service.Product.DelCategoryRes
  >(configure: DelCategoryDto): Promise<Services.Common.Response<R>> {
    return await this.categoryService.delete<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }
}
