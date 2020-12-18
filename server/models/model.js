import { pool } from './pool'

class Model {
    constructor(table, columns, shape) {
        this.pool = pool
        this.table = table
        this.columns = columns
        this.shape = { ...shape }
        this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client} `)
    }

    async select(clause) {
        let query = `SELECT ${this.all_columns()} FROM ${this.table}`
        if (clause) query += clause
        return this.pool.query(query)
    }

    async create(queryObj) {
        const query = `INSERT INTO ${this.table} (${this.all_columns()}) VALUES (${this.values_from_query(queryObj)});`
        console.log(query)
        return this.pool.query(query)
    }

    async remove(clause) {
        let query = `DELETE FROM ${this.table}`
        if (clause) query += clause
        return this.pool.query(query)
    }

    all_columns() {
        let list = ''
        this.columns.forEach((col, idx) => {
            list += col + (idx < this.columns.length-1 ? ', ' : '')
        })
        return list
    }

    values_from_query(queryObj) {
        console.log(queryObj)
        let list = ''
        this.columns.forEach((col, idx) => {
            const suffix = idx < this.columns.length-1 ? ', ' : ''
            if (!queryObj[col]) {
                list += 'NULL' + suffix
            } else {
                const value = queryObj[col] || 'NULL'
                const str = this.shape[col] === String || this.shape[col] === Date
                list += (str?`'`:``) + value + (str?`'`:``) + suffix
            }
        })
        return list
    }
}

export default Model