import { Global, Module } from '@/support/core'
import OrderModule from '../order/order.module'
import OrderController from '../order/order.controller'
import ArticleController from './article.controller'
import ArticleService from './article.service'

@Global()
@Module({
  imports: [OrderModule],
  controllers: [ArticleController, OrderController],
  providers: [ArticleService]
})
export default class ArticleModule { }
