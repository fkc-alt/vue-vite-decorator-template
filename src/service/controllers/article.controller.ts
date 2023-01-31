import * as axios from 'axios'
import { Controller, Get, Post, ParamTypes } from '@/support/core'
import RequestService from '../providers/request.provider'
import UtilService from '../providers/util.provider'

@Controller('article')
@ParamTypes(RequestService, UtilService)
export default class ArticleController {
  constructor (private readonly requestService: RequestService, private readonly utilService: UtilService) { }

  @Get('getArticleList')
  async GetArticleList<T = unknown, U = Service.ArticleListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }

  @Post('tableData')
  async GetTableDataList<T = unknown, U = Service.TableDataRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.requestService.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}
