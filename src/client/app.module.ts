import { Module } from 'http-typedi'
import { UserController, UserModule } from './routes/user'
import { ProductController, ProductModule } from './routes/product'
import { CommonModule } from './common/common.module'
import { CateGoryController } from './routes/product/category'

@Module({
  imports: [UserModule, ProductModule, CommonModule],
  providers: []
})
export class AppModule {
  constructor(
    readonly userController: UserController,
    readonly productController: ProductController,
    readonly productCateGoryController: CateGoryController
  ) {}
}
