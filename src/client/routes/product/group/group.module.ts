import { Module } from 'http-typedi'
import { GroupController } from './group.controller'
import { GroupService } from './group.service'

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService, GroupController]
})
export class GroupModule {}
