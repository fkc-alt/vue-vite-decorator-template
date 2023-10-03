import { Module } from 'http-typedi'
import { CategoryModule } from './category'
import { GroupModule } from './group'
import { SpecModule } from './spec'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [CategoryModule, GroupModule, SpecModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, ProductController]
})
export class ProductModule {}
