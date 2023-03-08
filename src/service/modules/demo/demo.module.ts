import { Global, Module } from '@/support/core'
import DemoService from './demo.service'

@Global()
@Module({
  providers: [DemoService]
})
export default class DemoModule { }
