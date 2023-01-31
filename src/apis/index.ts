import Service from '@/utils/service'
import { Module, Factory, Demo } from '@/descriptors/service'
import ArticleController from './modules/article'
import UserController from './modules/user'
import OrderController from './modules/order'

@Module({
  controllers: [ArticleController, UserController, OrderController],
  providers: [Service, Demo]
})
class ServiceModule {
  constructor (
    readonly ArticleController: ArticleController,
    readonly UrderController: UserController,
    readonly OrderController: OrderController
  ) {}
}

export default Factory(ServiceModule)
