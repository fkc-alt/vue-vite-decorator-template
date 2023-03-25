import { Module } from '@/support/core'
import MemberController from './member.controller'
import MemberService from './member.service'

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService]
})
export default class MemberModule {}
