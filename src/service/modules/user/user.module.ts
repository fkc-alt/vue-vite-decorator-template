import { Factory, Module } from '@/support/core'
import RequestService from '@/service/providers/request.service'
import UtilService from '@/service/providers/util.service'
import UserController from './user.controller'
import UserService from './user.service'

@Module({
  controllers: [UserController],
  providers: [RequestService, UtilService, UserService],
  exports: [UserService]
})
export default class UserModule {
  constructor (readonly userController: UserController) { }
}

export const UserModuleFactory = Factory(UserModule)
