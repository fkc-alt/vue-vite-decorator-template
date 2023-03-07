import { Module } from '@/support/core'
import RequestService from './providers/request.service'
import UtilService from './providers/util.service'

@Module({
  providers: [RequestService, UtilService],
  exports: [RequestService, UtilService]
})
export default class CommonModule { }
