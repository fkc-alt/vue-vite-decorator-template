import * as axios from 'axios'
import { Controller, Get, Post, ParamTypes } from '@/support/core'
import RequestService from '../providers/request.service'
import UtilService from '../providers/util.service'
import ArticleService from './article.service'

@Controller('article')
@ParamTypes(RequestService, ArticleService, UtilService)
export default class ArticleController {
  constructor (private readonly requestService: RequestService, private readonly articleService: ArticleService, private readonly utilService: UtilService) { }

  @Get('getArticleList')
  public async GetArticleList<T = unknown, U = Service.ArticleListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    this.articleService.Log()
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }

  @Post('tableData')
  public async GetTableDataList<T = unknown, U = Service.TableDataRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}
