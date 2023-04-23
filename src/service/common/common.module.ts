import { Global, Module } from 'http-typedi'
import ContentTypeService from './providers/contentType.service'
import RequestService from './providers/request.service'
import UtilService from './providers/util.service'

@Global()
@Module({
  providers: [
    RequestService,
    UtilService,
    ContentTypeService,
    {
      provide: 'CONFIG',
      useFactory: () => ({
        url: 'http://localhost:3000',
        host: 'localhost',
        log: false
      })
    },
    {
      provide: 'STRING',
      useValue: 'a,b,c'
    }
  ]
})
export default class CommonModule {}
