import { Global, Module } from '@nestjs/common'

import * as Knex from 'knex'
import { Model } from 'objection'

import { Category } from '../category/category.model'
import { Product } from '../product/product.model'

const models = [Category, Product]

const modelProviders = models.map((model) => {
    return {
        provide: model.name,
        useValue: model,
    }
})

const providers = [
    ...modelProviders,
    {
        provide: 'KnexConnection',
        useFactory: async () => {
            const knex = Knex({
                client: 'sqlite3',
                useNullAsDefault: true,
                connection: {
                    filename: './knex.sqlite',
                },
                debug: true,
            })

            Model.knex(knex)

            return knex
        },
    },
]

@Global()
@Module({
    providers: [...providers],
    exports: [...providers],
})
export class DatabaseModule {}
