import { Module } from 'http-typedi'
import { CategoryModule } from './category'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, ProductController]
})
export class ProductModule {}
