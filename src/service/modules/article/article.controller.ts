import type { AxiosRequestConfig } from 'axios'
import { Controller, Header, Post, flattenErrorList } from '@/support/core'
import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import ArticleService from './article.service'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'
import { randomKey } from '@/utils'
import { ElMessage } from 'element-plus'

@Controller('article')
export default class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly utilService: UtilService,
    private readonly requestService: RequestService
  ) {}

  @Post('getArticleList', validationError => {
    const messages = flattenErrorList(validationError)
    console.log(validationError, 'validationError', messages)
    ElMessage.error({
      dangerouslyUseHTMLString: true,
      message: `Customer validationError Message<br/>
        ${messages.map(message => `${message}<br/>`).join('')}`,
      duration: 5 * 1000
    })
    return validationError
  })
  @Header('RequestId', randomKey())
  public async GetArticleList<
    T = Service.ArticleListReq,
    U = Service.ArticleListRes
  >(configure: ArticleListDto): ServerRes<U> {
    this.articleService.Log(
      1,
      { age: 20 },
      { customElements: '<div>我是自定义Pipe</div>' }
    )
    console.log(this.utilService)
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
