import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import DemoService from './demo.service'
import MemberService from '../member/member.service'
export default class DemoController {
  private readonly utilService
  private readonly requestService
  private readonly demoServie
  private readonly memberService
  constructor (utilService: UtilService, requestService: RequestService, demoServie: DemoService, memberService: MemberService)
  GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes>(configure: T): ServerRes<U>
  GetTableDataList<T = Service.TableDataReq, U = Service.TableDataRes>(configure: T): ServerRes<U>
}
