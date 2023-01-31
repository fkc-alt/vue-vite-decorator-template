import { Module, Factory } from '@/support/core'
import ArticleController from './controllers/article.controller'
import UserController from './controllers/user.controller'
import OrderController from './controllers/order.controller'
import RequestService from './providers/request.provider'
import UtilService from './providers/util.provider'

@Module({
  controllers: [ArticleController, UserController, OrderController],
  providers: [RequestService, UtilService]
})
class ServiceModule {
  constructor (
    readonly ArticleController: ArticleController,
    readonly UserController: UserController,
    readonly OrderController: OrderController
  ) {}
}

export default Factory(ServiceModule)
