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

@Controller(Route.ARTICLE)
@Catch(error => {
  console.log(error, 'Controller')
})
@Header('Request-Route', Route.ARTICLE)
@UseInterceptorsReq((configure: Record<string, any>) => {
  console.log(configure, 'Controller')
  return configure
})
@UseInterceptorsRes(async result => {
  console.log(result, 'Controller')
  const callError = result.status !== 200 || result.data.code !== 200
  return !callError ? result.data : await Promise.reject(result)
})
export default class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Catch(catchCallback)
  @Header('RequestId', () => uuidv4())
  @Header('Content-Type', ContentTypeService.JSON)
  @Post(RouteChildren.GETARTICLELIST, validationErrorMessage)
  @UseInterceptorsReq(
    (configure: Record<string, any>) => {
      configure.name = '123'
      return configure
    },
    (configure: Record<string, any>) => {
      console.log(configure, 'last')
      return configure
    }
  )
  public async GetArticleList<
    T = Service.ArticleListReq,
    U = Service.ArticleListRes
  >(configure: ArticleListDto): ServerRes<U> {
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
