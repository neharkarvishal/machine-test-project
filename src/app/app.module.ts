import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from '../database/database.module'
import { CategoryModule } from '../category/category.module'
import { ProductModule } from '../product/product.module'

/** App Module */
@Module({
    imports: [
        // module imports
        DatabaseModule,
        CategoryModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
