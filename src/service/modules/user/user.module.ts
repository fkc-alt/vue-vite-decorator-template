import { Factory, Module } from '@/support/core'
import UserController from './user.controller'
import RequestService from '../../providers/request.service'
import UtilService from '../../providers/util.service'
import UserService from './user.service'

@Module({
  controllers: [UserController],
  providers: [RequestService, UtilService, UserService]
})
export default class UserModule {
  constructor (readonly UserController: UserController) {}
}

export const UserModuleFactory = Factory(UserModule)
