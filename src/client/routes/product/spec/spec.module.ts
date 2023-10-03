import { Module } from 'http-typedi'
import { SpecController } from './spec.controller'
import { SpecService } from './spec.service'

@Module({
  imports: [],
  controllers: [SpecController],
  providers: [SpecService],
  exports: [SpecService, SpecController]
})
export class SpecModule {}
