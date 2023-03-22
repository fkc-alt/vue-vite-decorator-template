import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import OrderService from './order.service'
export default class OrderController {
  private readonly utilService
  private readonly requestService
  readonly orderService: OrderService
  constructor (utilService: UtilService, requestService: RequestService, orderService: OrderService)
  GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes>(configure: T): ServerRes<U>
  GetTableDataList<T = Service.TableDataReq, U = Service.TableDataRes>(configure: T): ServerRes<U>
}
