import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import DemoService from './member.service'
export default class MemberController {
  private readonly utilService
  private readonly requestService
  readonly demoServie: DemoService
  constructor (utilService: UtilService, requestService: RequestService)
  GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes>(configure: T): ServerRes<U>
  GetTableDataList<T = Service.TableDataReq, U = Service.TableDataRes>(configure: T): ServerRes<U>
}
