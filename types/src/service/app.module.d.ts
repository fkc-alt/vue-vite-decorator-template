import ArticleController from './modules/article/article.controller'
import OrderController from './modules/order/order.controller'
import UserController from './modules/user/user.controller'
import OrderService from './modules/order/order.service'
import DemoController from './modules/demo/demo.controller'
export default class AppModule {
  readonly articleController: ArticleController
  readonly orderController: OrderController
  readonly userController: UserController
  readonly orderSerive: OrderService
  readonly demoController: DemoController
  constructor (articleController: ArticleController, orderController: OrderController, userController: UserController, orderSerive: OrderService, demoController: DemoController)
}
export declare const application: AppModule
