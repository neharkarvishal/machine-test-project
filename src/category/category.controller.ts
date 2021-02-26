import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateCategoryDto, Category, UpdateCategoryDto } from './category.model'
import { CategoryService } from './category.service'

@Controller(CategoryController.path)
@ApiTags(CategoryController.name)
export class CategoryController {
    static path = 'category'

    constructor(readonly service: CategoryService) {}

    /** Finds all (paginated) entries and return the result */
    @Get()
    async findAll(@Query() paginationParams) {
        const { data, paging } = await this.service.paginatedFindAll(
            paginationParams,
        )

        return {
            data,
            paging,
            statusCode: HttpStatus.OK,
        }
    }

    /** Finds entry by id and return the result */
    @Get(':id')
    async findOneById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.service.findOneById(id)

        if (!data)
            return Promise.reject(
                new NotFoundException(`Record with id ${id} not found`),
            )

        return {
            data,
            statusCode: HttpStatus.OK,
        }
    }

    /** Create a entry */
    @Post()
    async create(@Body() input: CreateCategoryDto) {
        const data = await this.service.create(input)

        return {
            data,
            statusCode: HttpStatus.CREATED,
        }
    }

    /** Update a entry */
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: UpdateCategoryDto,
    ) {
        const data = await this.service.update(id, input)

        return {
            data,
            statusCode: !data ? HttpStatus.NO_CONTENT : HttpStatus.OK,
        }
    }

    /** Soft-deletes a entry and return it */
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const data = await this.service.remove(id)

        if (!data)
            return Promise.reject(
                new NotFoundException(`Record with id ${id} not found`),
            )

        return {
            data,
            statusCode: !data ? HttpStatus.NO_CONTENT : HttpStatus.OK,
        }
    }
}
