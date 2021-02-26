import { raw, Model, ModelOptions, QueryContext } from 'objection'

export class BaseModel extends Model {
    id!: number

    created_at?: any

    updated_at?: any

    deleted_at?: any | null

    async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
        await super.$beforeUpdate(opt, queryContext)

        this.updated_at = raw('CURRENT_TIMESTAMP') // new Date().toISOString() // fn.now()
    }
}
