import { PartialType } from '@nestjs/swagger'

import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'
import type { JSONSchema } from 'objection'

import { BaseModel } from '../database/models/base.model'
import { Category } from '../category/category.model'
import { Model } from 'objection'

export class Product extends BaseModel {
    static tableName = 'product'

    name!: string

    categoryId?: number

    category?: Category

    static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['name'],
        properties: {
            id: { type: 'integer' },
            categoryId: { type: ['integer', 'null'] },
            name: { type: 'string', minLength: 2, maxLength: 255 },
            deleted_at: {
                anyOf: [{ type: 'string', format: 'date' }, { type: 'null' }],
            },
        },
    }

    static relationMappings = () => ({
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: Category,

            join: {
                from: 'product.categoryId',
                to: 'category.id',
            },
        },
    })
}

export class CreateProductDto {
    /**
     * Product Name
     * @example 'Spanner'
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    name!: string

    /**
     * Category Id
     * @example 1
     */
    @IsNumber()
    @IsOptional()
    categoryId?: number
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
