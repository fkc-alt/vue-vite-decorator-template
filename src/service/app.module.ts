import { CreateModule, Module } from '@/support/core'
import ArticleModule from './modules/article/article.module'
import UserModule from './modules/user/user.module'
import OrderModule from './modules/order/order.module'

@Module({
  imports: [ArticleModule, UserModule, OrderModule]
})
export default class ApplicationModule {
  constructor (
    readonly articleModule: ArticleModule,
    readonly orderModule: OrderModule,
    readonly userModule: UserModule
  ) {}
}
export const app = CreateModule(ApplicationModule)
