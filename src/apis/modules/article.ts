import * as axios from 'axios'
import { Controller, Get, Post, ParamTypes } from '@/descriptors/service'
import Service from '@/utils/service'

@Controller('article')
@ParamTypes(Service)
class ArticleController {
  a: string
  constructor (readonly service: Service) {
    this.a = 'article'
  }

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
