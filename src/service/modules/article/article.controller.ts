import type { AxiosRequestConfig } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import {
  Controller,
  Header,
  Post,
  Catch,
  UseInterceptors
} from '@/support/core'
import ContentTypeService from '@/service/common/providers/contentType.service'
import ArticleListDto from './dto/articleList.dto'
import TableDataDto from './dto/tableData.dto'
import ArticleService from './article.service'
import { catchCallback } from './catch/catch-callback'
import { validationErrorMessage } from './validation/validate'

@Controller('article')
@Catch(error => {
  console.log(error, 'Controller')
})
@Header('Request-Route', 'article')
@UseInterceptors((configure: Record<string, any>) => {
  console.log(configure, 'Controller')
  return configure
})
export default class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Catch(catchCallback)
  @Header('RequestId', () => uuidv4())
  @Header('Content-Type', ContentTypeService.JSON)
  @Post('getArticleList', validationErrorMessage)
  @UseInterceptors(
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
  @Header('tableData', 'tableData')
  @Catch(catchCallback)
  @Post('tableData')
  public async GetTableDataList<
    T = Service.TableDataReq,
    U = Service.TableDataRes
  >(configure: TableDataDto): ServerRes<U> {
    return await this.articleService.GetTableDataList<T, U>(
      <AxiosRequestConfig>configure
    )
  }
}
