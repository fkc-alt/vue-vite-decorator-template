import { Module, Factory } from '@/support/core'
import ArticleModule from './modules/article/article.module'
import UserModule from './modules/user/user.module'
import OrderModule from './modules/order/order.module'
import CommonModule from './common/common.module'
import ArticleService from './modules/article/article.service'
import ArticleController from './modules/article/article.controller'

@Module({
  imports: [ArticleModule, UserModule, OrderModule, CommonModule]
})
export default class ApplicationModule {
  constructor (readonly articleService: ArticleService, readonly articleController: ArticleController) {}
}
export const application = Factory(ApplicationModule)
