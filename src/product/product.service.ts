import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { ModelClass, raw } from 'objection'
import { Product, CreateProductDto, UpdateProductDto } from './product.model'

@Injectable()
export class ProductService {
    constructor(@Inject(Product.name) readonly product: ModelClass<Product>) {}

    async paginatedFindAll(paginationParams) {
        const { page = 0, pageSize = 3, order } = paginationParams
        const { results, total } = await this.product
            .query()
            .skipUndefined()
            .eager('category')
            .page(page, pageSize)

        return {
            data: results,
            paging: {
                pageSize,
                page,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        }
    }

    async findOneById(id: number) {
        return this.product
            .query()
            .skipUndefined()
            .eager('category')
            .findById(id)
            .first()
    }

    async remove(id: number) {
        return this.update(id, {
            // @ts-ignore
            deleted_at: raw('CURRENT_TIMESTAMP'),
        })
    }

    async create(input: CreateProductDto) {
        try {
            const prod = await this.product.query().findOne({ name: input.name })

            if (prod)
                throw new BadRequestException([`Duplicate name: ${prod.name}`])

            return await this.product.query().insert(input).returning('*')
        } catch (e) {
            return Promise.reject(new BadRequestException(e))
        }
    }

    async update(id: number, input: UpdateProductDto) {
        try {
            if (input?.name) {
                const prod = await this.product
                    .query()
                    .findOne({ name: input.name })
                    .skipUndefined()

                if (prod)
                    throw new BadRequestException([`Duplicate name: ${prod.name}`])
            }

            return await this.product.query().patchAndFetchById(id, input)
        } catch (e) {
            return Promise.reject(new BadRequestException(e))
        }
    }
}
