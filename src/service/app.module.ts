import { Injection, Module } from '@/support/core'
import ArticleModule from './modules/article/article.module'
import UserModule from './modules/user/user.module'
import OrderModule from './modules/order/order.module'
import CommonModule from './common/common.module'
import ArticleController from './modules/article/article.controller'
import OrderController from './modules/order/order.controller'
import UserController from './modules/user/user.controller'
import OrderService from './modules/order/order.service'
import DemoController from './modules/demo/demo.controller'
import ExampleModule from './modules/example/example.module'

@Module({
  imports: [
    ArticleModule,
    UserModule,
    OrderModule,
    CommonModule,
    ExampleModule
  ],
  providers: []
})
export default class AppModule {
  @Injection('CONFIG')
  public readonly config!: Record<string, any>

  @Injection('STRING')
  public readonly string!: string

  constructor(
    readonly articleController: ArticleController,
    readonly orderController: OrderController,
    readonly userController: UserController,
    readonly orderSerive: OrderService,
    readonly demoController: DemoController
  ) {}
}
