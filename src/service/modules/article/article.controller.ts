import type { AxiosRequestConfig } from 'axios'
import { Controller, Header, Post, Catch } from '@/support/core'
import ContentTypeService from '@/service/common/providers/contentType.service'
import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import { randomKey } from '@/utils'
import OrderService from '../order/order.service'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'
import ArticleService from './article.service'
import { handlerError } from './catch/handler.error'
import { validationErrorMessage } from './validation/validate'

@Controller('article')
export default class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly utilService: UtilService,
    private readonly requestService: RequestService,
    private readonly orderService: OrderService
  ) {}

  @Post('getArticleList', validationErrorMessage)
  @Header('RequestId', randomKey())
  @Header('Content-Type', ContentTypeService.JSON)
  @Catch(handlerError)
  public async GetArticleList<
    T = Service.ArticleListReq,
    U = Service.ArticleListRes
  >(configure: ArticleListDto): ServerRes<U> {
    this.articleService.Log(
      1,
      { age: 20 },
      { customElements: '<div>我是自定义Pipe</div>' }
    )
    console.log(this.utilService, this.orderService)
    return await this.requestService.request<T, U>(
      <AxiosRequestConfig>configure
    )
  }

  @Post('tableData')
  @Header('RequestId', randomKey())
  public async GetTableDataList<
    T = Service.TableDataReq,
    U = Service.TableDataRes
  >(configure: TableDataDto): ServerRes<U> {
    return await this.requestService.request<T, U>(
      <AxiosRequestConfig>configure
    )
  }
}
