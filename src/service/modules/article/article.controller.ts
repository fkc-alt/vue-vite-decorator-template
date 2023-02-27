import type { AxiosRequestConfig } from 'axios'
import { Controller, Get, Post } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import UtilService from '@/service/providers/util.service'
import ArticleService from './article.service'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'

@Controller('article')
export default class ArticleController {
  constructor (private readonly articleService: ArticleService, private readonly utilService: UtilService, private readonly requestService: RequestService) { }

  @Get('getArticleList')
  public async GetArticleList<T = Service.ArticleListReq, U = Service.ArticleListRes> (configure: ArticleListDto): ServerRes<U> {
    this.articleService.Log(1, { age: 20 })
    console.log(this.utilService)
    return await this.requestService.request<T, U>(<AxiosRequestConfig>configure)
  }

  @Post('tableData')
  public async GetTableDataList<T = Service.TableDataReq, U = Service.TableDataRes> (configure: TableDataDto): ServerRes<U> {
    return await this.requestService.request<T, U>(<AxiosRequestConfig>configure)
  }
}
