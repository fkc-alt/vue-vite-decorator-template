import type { AxiosRequestConfig } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import {
  Controller,
  Header,
  Post,
  Catch,
  UseInterceptorsReq,
  UseInterceptorsRes
} from '@/support/core'
import ContentTypeService from '@/service/common/providers/contentType.service'
import { Route, RouteChildren } from '..'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'
import ArticleService from './article.service'
import { catchCallback } from './catch/catch-callback'
import { validationErrorMessage } from './validation/validate'
import ExamplesService from '../example/examples.service'
import HelperController from './helper.comtroller'
import DemoController from '../demo/demo.controller'

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
  ) {}

  @Catch(catchCallback)
  @Header('RequestId', () => uuidv4())
  @Header('Content-Type', ContentTypeService.JSON)
  @Post(RouteChildren.GETARTICLELIST, validationErrorMessage)
  @UseInterceptorsReq(
    configure => {
      configure.headers && (configure.headers['Route-Path'] = 'GetArticleList')
      return configure
    },
    configure => {
      console.log(configure, 'last')
      return configure
    }
  )
  public async GetArticleList<
    T = Service.ArticleListReq,
    U = Service.ArticleListRes
  >(configure: ArticleListDto): ServerRes<U> {
    const data = await this.helperController.help(<Core.RequestConfig>{
      name: 123
    })
    console.log(data, 'helperController')
    return await this.articleService.GetArticleList<T, U>(
      <AxiosRequestConfig>configure
    )
  }

  @Header('RequestId', () => uuidv4())
  @Header(RouteChildren.TABLEDATA, RouteChildren.TABLEDATA)
  @Catch(catchCallback)
  @Post(RouteChildren.TABLEDATA)
  public async GetTableDataList<
    T = Service.TableDataReq,
    U = Service.TableDataRes
  >(configure: TableDataDto): ServerRes<U> {
    return await this.articleService.GetTableDataList<T, U>(
      <AxiosRequestConfig>configure
    )
  }
}
