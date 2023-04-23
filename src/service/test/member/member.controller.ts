import type { AxiosRequestConfig } from 'axios'
import { Controller, Injection, Post } from 'http-typedi'
import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import DemoService from './member.service'

@Controller('article')
export default class MemberController {
  @Injection()
  readonly demoServie!: DemoService

  constructor(
    private readonly utilService: UtilService,
    private readonly requestService: RequestService
  ) {}

  @Post('getArticleList')
  public async GetArticleList<
    T = Service.ArticleListReq,
    U = Service.ArticleListRes
  >(configure: T): ServerRes<U> {
    console.log(this.utilService)
    return await this.requestService.request<T, U>(
      <AxiosRequestConfig>configure
    )
  }

  @Post('tableData')
  public async GetTableDataList<
    T = Service.TableDataReq,
    U = Service.TableDataRes
  >(configure: T): ServerRes<U> {
    return await this.requestService.request<T, U>(
      <AxiosRequestConfig>configure
    )
  }
}
