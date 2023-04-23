import OrderModule from '@/service/test/order/order.module'
import { Global, Module } from 'http-typedi'
import MemberModule from '../member/member.module'
import DemoController from './demo.controller'
import DemoService from './demo.service'

@Global()
@Module({
  imports: [MemberModule, OrderModule],
  controllers: [DemoController],
  providers: [DemoService, DemoController]
})
export default class DemoModule {}
