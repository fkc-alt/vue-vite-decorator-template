import { Module } from '@/support/core'
import UserController from './user.controller'
import UserService from './user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export default class UserModule { }
