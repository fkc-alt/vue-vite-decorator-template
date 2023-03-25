import { Global, Module } from '@/support/core'
import RequestService from './providers/request.service'
import UtilService from './providers/util.service'

@Global()
@Module({
  providers: [RequestService, UtilService]
})
export default class CommonModule {}
