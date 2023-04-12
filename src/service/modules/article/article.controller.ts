import type { AxiosRequestConfig } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Controller, Header, Post, Catch } from '@/support/core'
import ContentTypeService from '@/service/common/providers/contentType.service'
import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import OrderService from '../order/order.service'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'
import ArticleService from './article.service'
import { catchCallback } from './catch/catch-callback'
import { validationErrorMessage } from './validation/validate'

@Controller('article')
@Catch((error: any) => {
  console.log(error, 'controller')
})
export default class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly utilService: UtilService,
    private readonly requestService: RequestService,
    private readonly orderService: OrderService
  ) {}

  @Catch(catchCallback)
  @Header('RequestId', uuidv4())
  @Header('Content-Type', ContentTypeService.JSON)
  @Post('getArticleList', validationErrorMessage)
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

  @Header('RequestId', uuidv4())
  @Header('tableData', 'tableData')
  @Catch(catchCallback)
  @Post('tableData')
  public async GetTableDataList<
    T = Service.TableDataReq,
    U = Service.TableDataRes
  >(configure: TableDataDto): ServerRes<U> {
    return await this.requestService.request<T, U>(
      <AxiosRequestConfig>configure
    )
  }
}
