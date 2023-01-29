import * as axios from 'axios'
import { Controller, Get, Post } from '@/descriptors/service'
import Service from '@/utils/service'

@Controller()
class ArticleModel extends Service {
  @Get('article/getArticleList')
  async GetArticleList<T = unknown, U = Service.ArticleListRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.request<T, U>(param as axios.AxiosRequestConfig)
  }

  @Post('article/tableData')
  async GetTableDataList<T = unknown, U = Service.TableDataRes>(param: T | axios.AxiosRequestConfig = {}): ServerRes<U> {
    return await this.request<T, U>(param as axios.AxiosRequestConfig)
  }
}

export default new ArticleModel({ baseURL: import.meta.env.VITE_APP_BASE_API })
