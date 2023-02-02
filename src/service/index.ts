import { CreateModule, Module } from '@/support/core'
import ArticleModule from './modules/article/article.module'
import UserModule from './modules/user/user.module'
import OrderModule from './modules/order/order.module'

@Module({})
class ServiceModule {
  constructor (
    readonly articleModule: ArticleModule,
    readonly orderModule: OrderModule,
    readonly userModule: UserModule
  ) {}
}
export default CreateModule(ServiceModule)
