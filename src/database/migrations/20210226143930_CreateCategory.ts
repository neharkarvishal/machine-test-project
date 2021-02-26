import * as Knex from 'knex'

const tableName = 'category'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, (t) => {
        t.increments('id').unsigned().primary()

        t.string('name').notNullable().unique()

        t.timestamps(true, true) // created_at, updated_at, useTimestamps, defaultToNow

        t.timestamp('deleted_at').nullable().defaultTo(null)
    })
}

export async function down(knex: Knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists(tableName)
    }

    return Promise.resolve()
}
