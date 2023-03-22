import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import ArticleService from './article.service'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'
export default class ArticleController {
  private readonly articleService
  private readonly utilService
  private readonly requestService
  constructor (articleService: ArticleService, utilService: UtilService, requestService: RequestService)
  GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes>(configure: ArticleListDto): ServerRes<U>
  GetTableDataList<T = Service.TableDataReq, U = Service.TableDataRes>(configure: TableDataDto): ServerRes<U>
}
