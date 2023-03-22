import RequestService from '../common/providers/request.service'
import UtilService from '../common/providers/util.service'
import DemoController from './demo/demo.controller'
import DemoService from './demo/demo.service'
import MemberService from './member/member.service'
import OrderService from './order/order.service'
import MemberController from './member/member.controller'
export default class AppModule {
  readonly demoService: DemoService
  readonly demoController: DemoController
  readonly memberService: MemberService
  readonly orderService: OrderService
  readonly memberController: MemberController
  readonly requestService: RequestService
  readonly utilService: UtilService
  constructor (demoService: DemoService, demoController: DemoController, memberService: MemberService, orderService: OrderService, memberController: MemberController)
}
export declare const application: AppModule
