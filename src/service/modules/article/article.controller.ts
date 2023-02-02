import * as axios from 'axios'
import { Controller, Get, Post } from '@/support/core'
import RequestService from '../../providers/request.service'
import UtilService from '../../providers/util.service'
import ArticleService from './article.service'

@Controller('article')
export default class ArticleController {
  constructor (private readonly articleService: ArticleService, private readonly utilService: UtilService, private readonly requestService: RequestService) { }

  @Get('getArticleList')
  public async GetArticleList<T = unknown, U = Service.ArticleListRes>(param: T): ServerRes<U> {
    this.articleService.Log()
    console.log(this.utilService)
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }

  @Post('tableData')
  public async GetTableDataList<T = unknown, U = Service.TableDataRes>(param: T): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}
