import { Module } from 'http-typedi'
import { CommonModule } from './common/common.module'
import { WechatUserController, WechatUserModule } from './routes/wechatUser'
import { UserController, UserModule } from './routes/user'
import {
  ProductModule,
  ProductController,
  CateGoryController,
  GroupController,
  SpecController
} from './routes/product'
import {
  OrderModule,
  OrderController,
  ReservationController,
  ReservationHelperController
} from './routes/order'

@Module({
  imports: [
    UserModule,
    ProductModule,
    WechatUserModule,
    OrderModule,
    CommonModule
  ],
  providers: []
})
export class AppModule {
  constructor(
    readonly userController: UserController,
    readonly productController: ProductController,
    readonly productCateGoryController: CateGoryController,
    readonly productGroupController: GroupController,
    readonly productSpecController: SpecController,
    readonly wechatUserController: WechatUserController,
    readonly orderController: OrderController,
    readonly reservationController: ReservationController,
    readonly reservationHelperController: ReservationHelperController
  ) {}
}
