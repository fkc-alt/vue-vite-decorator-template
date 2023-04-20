import { Global, Module } from '@/support/core'
import OrderModule from '../order/order.module'
import OrderController from '../order/order.controller'
import ArticleController from './article.controller'
import ArticleService from './article.service'
import HelperController from './helper.comtroller'

@Global()
@Module({
  imports: [OrderModule],
  controllers: [ArticleController, OrderController, HelperController],
  providers: [ArticleService],
  exports: [HelperController]
})
export default class ArticleModule {}
