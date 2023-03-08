import { Module, SupportFactory } from '@/support/core'
import RequestService from '../common/providers/request.service'
import UtilService from '../common/providers/util.service'
import DemoController from './demo/demo.controller'
import DemoModule from './demo/demo.module'
import DemoService from './demo/demo.service'
import MemberModule from './member/member.module'
import MemberService from './member/member.service'

@Module({
  imports: [DemoModule, MemberModule],
  controllers: [DemoController],
  providers: [UtilService, RequestService]
})
export default class AppModule {
  constructor (readonly demoService: DemoService, readonly demoController: DemoController, readonly memberService: MemberService) {}
}
export const application = SupportFactory.create(AppModule)
