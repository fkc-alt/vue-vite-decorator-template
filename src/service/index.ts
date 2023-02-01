import { CreateModule, Module } from '@/support/core'
import ArticleModule from './modules/article/article.module'
import UserModule from './modules/user/user.module'
import OrderModule from './modules/order/order.module'

@Module({
  imports: [ArticleModule, UserModule, OrderModule]
})
class ServiceModule {
  constructor (
    readonly ArticleModule: ArticleModule,
    readonly UserModule: UserModule,
    readonly OrderModule: OrderModule
  ) {}
}
export default CreateModule(ServiceModule)
