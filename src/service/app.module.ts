import { Injection, Module, SuperFactory } from '@/support/core'
import ArticleModule from './modules/article/article.module'
import UserModule from './modules/user/user.module'
import OrderModule from './modules/order/order.module'
import CommonModule from './common/common.module'
import ArticleController from './modules/article/article.controller'
import OrderController from './modules/order/order.controller'
import UserController from './modules/user/user.controller'
import OrderService from './modules/order/order.service'
import DemoController from './modules/demo/demo.controller'

@Module({
  imports: [ArticleModule, UserModule, OrderModule, CommonModule],
  providers: []
})
export default class AppModule {
  @Injection('CONFIG')
  config!: {
    provide: string
    useFactory: () => any
  }

  constructor(
    readonly articleController: ArticleController,
    readonly orderController: OrderController,
    readonly userController: UserController,
    readonly orderSerive: OrderService,
    readonly demoController: DemoController
  ) {}
}

export const application = SuperFactory.create(AppModule)
