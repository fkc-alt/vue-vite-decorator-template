import { Factory, Module } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import UtilService from '@/service/providers/util.service'
import ArticleController from './article.controller'
import ArticleService from './article.service'

@Module({
  controllers: [ArticleController],
  providers: [RequestService, UtilService, ArticleService]
})
export default class ArticleModule {
  constructor (readonly articleController: ArticleController) { }
}

export const ArticleModuleFactory = Factory(ArticleModule)
