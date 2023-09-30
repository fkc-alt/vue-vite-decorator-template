import { Module } from 'http-typedi'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, ProductController]
})
export class ProductModule {}
