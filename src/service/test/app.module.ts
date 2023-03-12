import { Module, SupportFactory, Injection } from '@/support/core'
import RequestService from '../common/providers/request.service'
import UtilService from '../common/providers/util.service'
import DemoController from './demo/demo.controller'
import DemoModule from './demo/demo.module'
import DemoService from './demo/demo.service'
import MemberModule from './member/member.module'
import MemberService from './member/member.service'
import OrderService from './order/order.service'
import MemberController from './member/member.controller'

@Module({
  imports: [DemoModule, MemberModule],
  controllers: [DemoController, MemberController],
  providers: [UtilService, RequestService]
})
export default class AppModule {
  @Injection()
  readonly requestService!: RequestService

  @Injection()
  readonly utilService!: UtilService

  constructor (readonly demoService: DemoService, readonly demoController: DemoController, readonly memberService: MemberService, readonly orderService: OrderService, readonly memberController: MemberController) {}
}

export const application = SupportFactory.create(AppModule)
