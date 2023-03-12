import type { AxiosRequestConfig } from 'axios'
import { Controller, Post } from '@/support/core'
import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import DemoService from './demo.service'
import MemberService from '../member/member.service'

@Controller('article')
export default class DemoController {
  constructor (
    private readonly utilService: UtilService,
    private readonly requestService: RequestService,
    private readonly demoServie: DemoService,
    private readonly memberService: MemberService
  ) { }

  @Post('getArticleList')
  public async GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes> (configure: T): ServerRes<U> {
    console.log(this.utilService)
    return await this.requestService.request<T, U>(<AxiosRequestConfig>configure)
  }

  @Post('tableData')
  public async GetTableDataList<T = Service.TableDataReq, U = Service.TableDataRes> (configure: T): ServerRes<U> {
    return await this.requestService.request<T, U>(<AxiosRequestConfig>configure)
  }
}
