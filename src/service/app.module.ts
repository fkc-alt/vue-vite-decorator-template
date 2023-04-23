import { Injection, Module } from 'http-typedi'
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
import RequestService from './common/providers/request.service'
import DemoModule from './modules/demo/demo.module'

@Module({
  imports: [
    ArticleModule,
    UserModule,
    OrderModule,
    CommonModule,
    ExampleModule,
    DemoModule
  ],
  providers: []
})
export default class AppModule {
  @Injection()
  public readonly requestService!: RequestService

  @Injection('CONFIG')
  public readonly config!: Record<string, any>

  @Injection('STRING')
  public readonly string!: string

  @Injection('order')
  public readonly order!: string

  constructor(
    readonly articleController: ArticleController,
    readonly orderController: OrderController,
    readonly userController: UserController,
    readonly orderSerive: OrderService,
    readonly demoController: DemoController
  ) {}
}
