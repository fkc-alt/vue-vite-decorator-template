import { Global, Module } from '@/support/core'
import ContentTypeService from './providers/contentType.service'
import RequestService from './providers/request.service'
import UtilService from './providers/util.service'

@Global()
@Module({
  providers: [RequestService, UtilService, ContentTypeService]
})
export default class CommonModule {}
