import { Module } from 'http-typedi'
import { UserController, UserModule } from './routes/user'
import { CommonModule } from './common/common.module'

@Module({
  imports: [UserModule, CommonModule],
  providers: []
})
export class AppModule {
  constructor(readonly userController: UserController) {}
}
