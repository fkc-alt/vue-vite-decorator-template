import { CreateModule, Injectable } from '@/support/core'
import ArticleModule from './article/article.module'
import UserModule from './user/user.module'
import OrderModule from './order/order.module'

@Injectable()
class ServiceModule {
  constructor (
    readonly articleModule: ArticleModule,
    readonly orderModule: OrderModule,
    readonly userModule: UserModule
  ) {}
}
export default CreateModule(ServiceModule)
