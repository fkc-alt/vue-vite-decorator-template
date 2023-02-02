import { Factory, Module } from '@/support/core'
import ArticleController from './article.controller'
import RequestService from '../../providers/request.service'
import UtilService from '../../providers/util.service'
import ArticleService from './article.service'

@Module({
  controllers: [ArticleController],
  providers: [RequestService, UtilService, ArticleService]
})
export default class ArticleModule {
  constructor (readonly articleController: ArticleController) {}
}

export const ArticleModuleFactory = Factory(ArticleModule)
