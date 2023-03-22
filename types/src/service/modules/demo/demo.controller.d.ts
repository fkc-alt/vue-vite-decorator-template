import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import ArticleService from '../article/article.service'
export default class DemoController {
  private readonly articleService
  private readonly utilService
  private readonly requestService
  constructor (articleService: ArticleService, utilService: UtilService, requestService: RequestService)
  GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes>(configure: T): ServerRes<U>
  GetTableDataList<T = Service.TableDataReq, U = Service.TableDataRes>(configure: T): ServerRes<U>
}
