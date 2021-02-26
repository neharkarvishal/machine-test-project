import * as Knex from 'knex'
import { Category } from '../../category/category.model'

export async function seed(knex: Knex) {
    await Category.query(knex).insert({
        name: 'Electronics',
    })

    await Category.query(knex).insert({
        name: 'Tools',
    })

    await Category.query(knex).insert({
        name: 'Entertainment',
    })

    await Category.query(knex).insert({
        name: 'Grocery',
    })

    await Category.query(knex).insert({
        name: 'Stationary',
    })
}
