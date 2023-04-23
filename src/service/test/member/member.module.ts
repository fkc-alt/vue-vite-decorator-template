import { Module } from 'http-typedi'
import MemberController from './member.controller'
import MemberService from './member.service'

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService, MemberController]
})
export default class MemberModule {}
