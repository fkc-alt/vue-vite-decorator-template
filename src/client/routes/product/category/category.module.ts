import { Module } from 'http-typedi'
import { CateGoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [],
  controllers: [CateGoryController],
  providers: [CategoryService],
  exports: [CategoryService, CateGoryController]
})
export class CategoryModule {}
