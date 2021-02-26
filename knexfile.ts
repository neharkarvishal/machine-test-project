import 'dotenv/config'
import * as Knex from 'knex'

module.exports = {
    debug: true,
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: './knex.sqlite' },
    seeds: { directory: './src/database/seeds' },
    migrations: { directory: './src/database/migrations' },
} as Knex.Config
