import { Module } from 'http-typedi'
import { UserController, UserModule } from './routes/user'
import { ProductController, ProductModule } from './routes/product'
import { CommonModule } from './common/common.module'

@Module({
  imports: [UserModule, ProductModule, CommonModule],
  providers: []
})
export class AppModule {
  constructor(
    readonly userController: UserController,
    readonly productController: ProductController
  ) {}
}
