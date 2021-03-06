import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { ModelClass, raw } from 'objection'
import { Category, CreateCategoryDto, UpdateCategoryDto } from './category.model'

@Injectable()
export class CategoryService {
    constructor(@Inject(Category.name) readonly category: ModelClass<Category>) {}

    async paginatedFindAll(paginationParams) {
        const { page = 0, pageSize = 3, order } = paginationParams
        const {
            results,
            total,
        } = await this.category
            .query()
            .skipUndefined()
            .eager('product')
            .page(page, pageSize)

        return {
            data: results,
            paging: {
                pageSize: Number(pageSize),
                page: Number(page),
                total: Number(total),
                totalPages: Math.ceil(total / pageSize),
            },
        }
    }

    async findOneById(id: number) {
        return this.category
            .query()
            .skipUndefined()
            .eager('product')
            .findById(id)
            .first()
    }

    async remove(id: number) {
        return this.update(id, {
            // @ts-ignore
            deleted_at: raw('CURRENT_TIMESTAMP'),
        })
    }

    async create(input: CreateCategoryDto) {
        try {
            const catg = await this.category.query().findOne({ name: input.name })

            if (catg)
                throw new BadRequestException([`Duplicate name: ${catg.name}`])

            return await this.category.query().insert(input).returning('*')
        } catch (e) {
            return Promise.reject(new BadRequestException(e))
        }
    }

    async update(id: number, input: UpdateCategoryDto) {
        try {
            if (input?.name) {
                const catg = await this.category
                    .query()
                    .findOne({ name: input.name })
                    .skipUndefined()

                if (catg)
                    throw new BadRequestException([`Duplicate name: ${catg.name}`])
            }

            return await this.category.query().patchAndFetchById(id, input)
        } catch (e) {
            return Promise.reject(new BadRequestException(e))
        }
    }
}
