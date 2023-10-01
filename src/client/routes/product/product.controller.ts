import { Controller, PostMapping, RequestConfig } from 'http-typedi'
import { ProductService } from './product.service'
import {
  ProductAddDto,
  AddPropertiesDto,
  DelPropertiesDto,
  ProductListDto,
  ProductDeleteDto,
  ProductDetailDto,
  ProductUpdateDto,
  PropertiesListDto
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

  @PostMapping('update')
  public async update<
    T extends Service.Product.ProductUpdateReq,
    R extends Service.Product.ProductUpdateRes
  >(configure: ProductUpdateDto): Promise<Services.Common.Response<R>> {
    return await this.productService.update<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('delete')
  public async del<
    T extends Service.Product.ProductDeleteReq,
    R extends Service.Product.ProductDeleteRes
  >(configure: ProductDeleteDto): Promise<Services.Common.Response<R>> {
    return await this.productService.del<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('detail')
  public async detail<
    T extends Service.Product.ProductDetailReq,
    R extends Service.Product.ProductDetailRes
  >(configure: ProductDetailDto): Promise<Services.Common.Response<R>> {
    return await this.productService.detail<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('list')
  public async list<
    T extends Service.Product.ProductListReq,
    R extends Service.Product.ProductListRes
  >(configure: ProductListDto): Promise<Services.Common.Response<R>> {
    return await this.productService.list<T, Services.Common.Response<R>>(
      <RequestConfig<T>>configure
    )
  }

  @PostMapping('properties/list')
  public async propertiesList<
    T extends Service.Product.PropertiesListReq,
    R extends Service.Product.PropertiesListRes
  >(configure: PropertiesListDto): Promise<Services.Common.Response<R>> {
    return await this.productService.propertiesList<
      T,
      Services.Common.Response<R>
    >(<RequestConfig<T>>configure)
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
