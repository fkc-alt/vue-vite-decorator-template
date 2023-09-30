import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { ProductService } from './product.service'
import {
  ProductAddDto,
  AddPropertiesDto,
  DelPropertiesDto
} from './dto/product.dto'

@Controller('product/v1')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @PostMapping('add')
  public async add<
    T extends Service.Product.ProductAddReq,
    R extends Service.Product.ProductAddRes
  >(configure: ProductAddDto): Promise<Services.Common.Response<R>> {
    return await this.productService.add<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('properties/add')
  public async addProperties<
    T extends Service.Product.AddPropertiesReq,
    R extends Service.Product.AddPropertiesRes
  >(configure: AddPropertiesDto): Promise<Services.Common.Response<R>> {
    return await this.productService.addProperties<
      T,
      Services.Common.Response<R>
    >(<RequestConfig<T>>configure)
  }

  @PostMapping('properties/delete')
  public async delProperties<
    T extends Service.Product.DelPropertiesReq,
    R extends Service.Product.DelPropertiesRes
  >(configure: DelPropertiesDto): Promise<Services.Common.Response<R>> {
    return await this.productService.delProperties<
      T,
      Services.Common.Response<R>
    >(<RequestConfig<T>>configure)
  }
}
