import { Factory, Module } from '@/support/core'
import CommonModule from '../../common/common.module'
import OrderModule from '../order/order.module'
import OrderController from '../order/order.controller'
import ArticleController from './article.controller'
import ArticleService from './article.service'

@Module({
  imports: [OrderModule, CommonModule],
  controllers: [ArticleController, OrderController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export default class ArticleModule {
  constructor (readonly articleController: ArticleController, readonly orderController: OrderController) { }
}

export const ArticleModuleFactory = Factory(ArticleModule)
