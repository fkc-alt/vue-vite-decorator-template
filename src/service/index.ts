import { Module, Factory } from '@/support/core'
import ArticleController from './controllers/article.controller'
import UserController from './controllers/user.controller'
import OrderController from './controllers/order.controller'
import Service from './providers/service.provider'
import { Utils } from './providers/utils.provider'

@Module({
  controllers: [ArticleController, UserController, OrderController],
  providers: [Service, Utils]
})
class ServiceModule {
  constructor (
    readonly ArticleController: ArticleController,
    readonly UserController: UserController,
    readonly OrderController: OrderController
  ) {}
}

export default Factory(ServiceModule)
