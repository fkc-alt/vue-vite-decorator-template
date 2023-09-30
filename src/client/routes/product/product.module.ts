import { Module } from 'http-typedi'
import { CategoryModule } from './category'
import { GroupModule } from './group'
import { SpceModule } from './spce'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [CategoryModule, GroupModule, SpceModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, ProductController]
})
export class ProductModule {}
