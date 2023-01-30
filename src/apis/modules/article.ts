import * as axios from 'axios'
import { Controller, Get, Injectable, Post } from '@/descriptors/service'
import Service from '@/utils/service'
import { ParamTypes } from '@/descriptors/demo'

@Controller('article')
@Injectable()
@ParamTypes(Service)
class ArticleController {
  constructor (readonly service: Service) {}
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
