import * as axios from 'axios'
import { Controller, Get, Post, ParamTypes } from '@/support/core'
import Service from '@/utils/service'
import { Utils } from '@/utils/utils.provider'

@Controller('article')
@ParamTypes(Service, Utils)
class ArticleController {
  constructor (readonly service: Service, private readonly utils: Utils) { }

  @Get('getArticleList')
  async GetArticleList<T = unknown, U = Service.ArticleListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.service.request<T, U>(<axios.AxiosRequestConfig>param)
  }

  @Post('tableData')
  async GetTableDataList<T = unknown, U = Service.TableDataRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.service.request<T, U>(<axios.AxiosRequestConfig>param)
  }
}

export default ArticleController
