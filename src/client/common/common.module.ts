import {
  Global,
  Logger,
  Module,
  RequestService,
  UploadService
} from 'http-typedi'

@Global()
@Module({
  providers: [RequestService, UploadService, Logger]
})
export class CommonModule {}
