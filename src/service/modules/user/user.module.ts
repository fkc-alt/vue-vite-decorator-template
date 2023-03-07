import { Factory, Module } from '@/support/core'
import CommonModule from '../../common/common.module'
import UserController from './user.controller'
import UserService from './user.service'

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export default class UserModule {
  constructor (readonly userController: UserController) { }
}

export const UserModuleFactory = Factory(UserModule)
