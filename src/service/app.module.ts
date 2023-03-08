import { Module, SupportFactory } from '@/support/core'
import ArticleModule from './modules/article/article.module'
import UserModule from './modules/user/user.module'
import OrderModule from './modules/order/order.module'
import CommonModule from './common/common.module'
import ArticleController from './modules/article/article.controller'
import OrderController from './modules/order/order.controller'
import UserController from './modules/user/user.controller'
import DemoModule from './modules/demo/demo.module'
import OrderService from './modules/order/order.service'

@Module({
  imports: [ArticleModule, UserModule, OrderModule, CommonModule, DemoModule]
})
export default class AppModule {
  constructor (readonly articleController: ArticleController, readonly orderController: OrderController, readonly userController: UserController, readonly orderSerive: OrderService) {}
}
export const application = SupportFactory.create(AppModule)
