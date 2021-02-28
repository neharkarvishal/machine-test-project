import { PartialType } from '@nestjs/swagger'

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import type { JSONSchema } from 'objection'

import { BaseModel } from '../database/models/base.model'
import { Model } from 'objection'
import { Product } from '../product/product.model'

export class Category extends BaseModel {
    static tableName = 'category'

    name!: string

    product?: Product

    static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['name'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 2, maxLength: 255 },
            deleted_at: {
                anyOf: [{ type: 'string', format: 'date' }, { type: 'null' }],
            },
        },
    }

    static relationMappings = () => ({
        product: {
            relation: Model.HasManyRelation,
            modelClass: Product,

            join: {
                from: 'category.id',
                to: 'product.categoryId',
            },
        },
    })
}

export class CreateCategoryDto {
    /**
     * Category Name
     * @example 'Tools'
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    name!: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
