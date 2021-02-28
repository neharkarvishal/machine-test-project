import * as Knex from 'knex'
import { Category } from '../../category/category.model'

export async function seed(knex: Knex) {
    /*
    await Category.query(knex).insert({
        name: 'Electronics',
    })

    await Category.query(knex).insert({
        name: 'Hardware',
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
    */

    // @ts-ignore
    await Category.query(knex).insertGraph({
        name: 'Electronics',
        product: [
            {
                name: 'Phone',
            },
            {
                name: 'Feature Phone',
            },
            {
                name: 'Smart Phone',
            },
            {
                name: 'Landline Phone',
            },
            {
                name: 'Satellite Phone ',
            },
            {
                name: 'Phone Accessories',
            },
            {
                name: 'Prepaid SIM',
            },
            {
                name: 'Postpaid SIM',
            },
            {
                name: 'Laptop',
            },
            {
                name: 'Gaming Laptop',
            },
            {
                name: 'Office Laptop',
            },
            {
                name: 'Laptop Accessories',
            },
            {
                name: 'All In One Desktop',
            },
        ],
    })

    // @ts-ignore
    await Category.query(knex).insertGraph({
        name: 'Hardware',
        product: [
            {
                name: 'Hardware-01',
            },
            {
                name: 'Hardware-02',
            },
            {
                name: 'Hardware-03',
            },
            {
                name: 'Hardware-04',
            },
            {
                name: 'Hardware-05',
            },
            {
                name: 'Hardware-06',
            },
            {
                name: 'Hardware-07',
            },
            {
                name: 'Hardware-08',
            },
            {
                name: 'Hardware-09',
            },
            {
                name: 'Hardware-10',
            },
            {
                name: 'Hardware-11',
            },
        ],
    })

    // @ts-ignore
    await Category.query(knex).insertGraph({
        name: 'Stationary',
        product: [
            {
                name: 'Stationary-01',
            },
            {
                name: 'Stationary-02',
            },
            {
                name: 'Stationary-03',
            },
            {
                name: 'Stationary-04',
            },
            {
                name: 'Stationary-05',
            },
            {
                name: 'Stationary-06',
            },
            {
                name: 'Stationary-07',
            },
            {
                name: 'Stationary-08',
            },
            {
                name: 'Stationary-09',
            },
            {
                name: 'Stationary-10',
            },
            {
                name: 'Stationary-11',
            },
        ],
    })

    // @ts-ignore
    await Category.query(knex).insertGraph({
        name: 'Entertainment',
        product: [
            {
                name: 'Entertainment-01',
            },
            {
                name: 'Entertainment-02',
            },
            {
                name: 'Entertainment-03',
            },
            {
                name: 'Entertainment-04',
            },
            {
                name: 'Entertainment-05',
            },
            {
                name: 'Entertainment-06',
            },
            {
                name: 'Entertainment-07',
            },
            {
                name: 'Entertainment-08',
            },
            {
                name: 'Entertainment-09',
            },
            {
                name: 'Entertainment-10',
            },
            {
                name: 'Entertainment-11',
            },
        ],
    })
}
