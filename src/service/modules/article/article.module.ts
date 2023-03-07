import { Factory, Module } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import UtilService from '@/service/providers/util.service'
import OrderModule from '../order/order.module'
import OrderController from '../order/order.controller'
import ArticleController from './article.controller'
import ArticleService from './article.service'

@Module({
  imports: [OrderModule],
  controllers: [ArticleController, OrderController],
  providers: [RequestService, UtilService, ArticleService]
})
export default class ArticleModule {
  constructor (readonly articleController: ArticleController, readonly orderController: OrderController) { }
}

export const ArticleModuleFactory = Factory(ArticleModule)
