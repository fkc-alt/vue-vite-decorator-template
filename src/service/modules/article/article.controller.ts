import type { AxiosRequestConfig } from 'axios'
import {
  Controller,
  Header,
  Catch,
  UseInterceptorsReq,
  UseInterceptorsRes
} from '@/support/core'
import { Route } from '..'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'
import ArticleService from './article.service'
import ExamplesService from '../example/examples.service'
import HelperController from './helper.controller'
import DemoController from '../demo/demo.controller'
import {
  GetArticleListApplyDecorators,
  GetTableDataApplyDecorators
} from './decorators'

@Controller(Route.ARTICLE)
@Catch(error => {
  console.log(error, 'Controller')
})
@Header('Request-Route', Route.ARTICLE)
@UseInterceptorsReq(configure => {
  console.log(configure, 'Controller InterceptorsReq')
  return configure
})
@UseInterceptorsRes(result => {
  console.log(result, 'Controller InterceptorsRes')
  const callError = result?.status !== 200 || result?.data?.code !== 200
  if (!callError) return result.data
  return Promise.reject(result) // or throw result
})
export default class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly examplesService: ExamplesService,
    private readonly helperController: HelperController,
    private readonly demoController: DemoController
  ) {
    // 解构使用方法的话需要在构造中绑定this
    this.GetArticleList = this.GetArticleList.bind(this)
    this.GetTableDataList = this.GetTableDataList.bind(this)
  }

  @GetArticleListApplyDecorators()
  public async GetArticleList<
    T = Service.ArticleListReq,
    U = Service.ArticleListRes
  >(configure: ArticleListDto): ServerRes<U> {
    const { data } = await this.helperController.getApidoc({
      pageSize: 0,
      currentPage: 0
    })
    console.log(data, 'helperController')
    return await this.articleService.GetArticleList<T, U>(
      <AxiosRequestConfig>configure
    )
  }

  @GetTableDataApplyDecorators()
  public async GetTableDataList<
    T = Service.TableDataReq,
    U = Service.TableDataRes
  >(configure: TableDataDto): ServerRes<U> {
    return await this.articleService.GetTableDataList<T, U>(
      <AxiosRequestConfig>configure
    )
  }
}
