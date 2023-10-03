import { Module } from 'http-typedi'
import { UserController, UserModule } from './routes/user'
import {
  ProductModule,
  ProductController,
  CateGoryController,
  GroupController,
  SpecController
} from './routes/product'
import { CommonModule } from './common/common.module'

@Module({
  imports: [UserModule, ProductModule, CommonModule],
  providers: []
})
export class AppModule {
  constructor(
    readonly userController: UserController,
    readonly productController: ProductController,
    readonly productCateGoryController: CateGoryController,
    readonly productGroupController: GroupController,
    readonly productSpecController: SpecController
  ) {}
}
