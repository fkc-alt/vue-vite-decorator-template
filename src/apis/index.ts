import { Module } from '@/descriptors/service'
import ArticleController from './modules/article'
import UserConroller from './modules/user'
import OrderConroller from './modules/order'
import Service from '@/utils/service'
import { Factory } from '@/descriptors/demo'

@Module({
  controllers: [ArticleController, UserConroller, OrderConroller],
  providers: [Service]
})
class ServiceModule {
  constructor (readonly article: ArticleController,
    readonly user: UserConroller,
    readonly order: OrderConroller) {}
}
console.log(Factory(ServiceModule))
export default Factory(ServiceModule)
