import { Module } from '@nestjs/common'

import { ProductController } from './product.controller'
import { ProductService } from './product.service'

/** Category module */
@Module({
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
