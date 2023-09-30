import { Module } from 'http-typedi'
import { SpceController } from './spce.controller'
import { SpceService } from './spce.service'

@Module({
  imports: [],
  controllers: [SpceController],
  providers: [SpceService],
  exports: [SpceService, SpceController]
})
export class SpceModule {}
