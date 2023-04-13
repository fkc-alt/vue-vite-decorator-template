import {
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  DefaultValuePipe
} from '@/support/core'
import { AxiosRequestConfig } from 'axios'
import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import OrderService from '../order/order.service'

class CustomValidationPipe implements Core.PipeTransform {
  transform(value: string): string {
    console.log(`CustomValidationPipe=====${value}`)
    return value
  }
}

@Injectable()
export default class ArticleService {
  constructor(
    private readonly requestService: RequestService,
    private readonly utilService: UtilService,
    private readonly orderService: OrderService
  ) {}

  public GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes>(
    configure: AxiosRequestConfig<T>
  ): ServerRes<U> {
    console.log(this.utilService, this.orderService)
    this.Log(1, { age: 20 }, { customElements: '<div>我是自定义Pipe</div>' })
    return this.requestService.request(configure)
  }

  public async GetTableDataList<
    T = Service.TableDataReq,
    U = Service.TableDataRes
  >(configure: AxiosRequestConfig<T>): ServerRes<U> {
    return await this.requestService.request<T, U>(configure)
  }

  @Inject()
  public Log(
    @Param(['id', 'price'], new DefaultValuePipe('1000.99'), new ParseIntPipe())
    record: number | Record<string, any>,
    @Param('name', new DefaultValuePipe('落魄前端'))
    name: string | Record<string, any>,
    @Param('customElements', new CustomValidationPipe())
    custom: string | Record<string, any>
  ): void {
    console.log('this is ArticleService', record, name, custom, 'custom')
  }
}
