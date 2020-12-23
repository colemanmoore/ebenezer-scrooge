import { pool } from './index'

class Model {
    constructor(table, columns, shape) {
        this.pool = pool
        this.table = table
        this.columns = columns
        this.shape = { ...shape }
        this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client} `)
    }

    async select(queryObj, special) {
        const params = {}
        this.columns.forEach(col => {
            if (queryObj[col]) params[col] = queryObj[col]
        })

        let query = `SELECT id, ${this.list_columns()} FROM ${this.table}`
        const keys = Object.keys(params)
        if (keys.length) {
            query += ' WHERE '
            keys.forEach((key, idx) => {
                const suffix = idx < keys.length-1 ? ', ' : ''
                const str = this.shape[key] === String || this.shape[key] === Date
                query += `${key} = ${str?`'`:``}${params[key]}${str?`'`:``}` + suffix
            })
            query += special ? ` AND ${special}` : '' + ';'
        } else {
            query += special ? ` WHERE ${special}` : '' + ';'
        }
        console.log(query)
        return this.pool.query(query)
    }

    async create(queryObj) {
        let valuesList = this.values_from_query(queryObj)
        const query = `INSERT INTO ${this.table} (${this.list_columns()}) VALUES (${valuesList});`
        console.log(query)
        return this.pool.query(query)
    }

    async update(queryObj, condition) {
        let query = `UPDATE ${this.table} SET `
        this.columns.forEach((col, idx) => {
            if (queryObj[col]) {
                const suffix = idx < this.columns.length-1 ? ', ' : ''
                const str = this.shape[col] === String || this.shape[col] === Date
                query += `${col} = ${str?`'`:``}${queryObj[col]}${str?`'`:``}` + suffix
            }
        })
        if (condition) {
            query += ` WHERE ${condition}`
        }
        query += ';'
        console.log(query)
        return this.pool.query(query)
    }

    async remove(id) {
        let query = `DELETE FROM ${this.table} WHERE id = ${id};`
        console.log(query)
        return this.pool.query(query)
    }

    list_columns() {
        let list = ''
        this.columns.forEach((col, idx) => {
            list += col + (idx < this.columns.length-1 ? ', ' : '')
        })
        return list
    }

    values_from_query(queryObj) {
        let list = ''
        this.columns.forEach((col, idx) => {
            const suffix = idx < this.columns.length-1 ? ', ' : ''
            const value = queryObj[col] || 'NULL'
            const str = this.shape[col] === String || this.shape[col] === Date
            list += (str?`'`:``) + value + (str?`'`:``) + suffix
        })
        return list
    }
}

export default Model