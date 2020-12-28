import { Router } from 'express'
import { AccountModel } from './datastore/account'
import { EntryModel } from './datastore/entry'
import { createSessionCookie, checkSession } from './auth-middleware'

export default () => {
    let api = Router()

    api.get('/', (req, res) => res.json({ message: 'Welcome to the api' }))

    api.post('/login', createSessionCookie, (req, res) => {
        res.json({ message: 'Success' })
    })

    api.get('/entries', checkSession, async (req, res) => {
        const { user_id } = res.locals
        const resp = await EntryModel.select({
            ...req.query,
            user_id
        },`date >= '${req.query.after}'`)
        res.status(200).json({ entries: resp.rows })
    })

    api.post('/entries', checkSession, async (req, res) => {
        if (!req.body.date) res.status(400).send('New entry missing date field')
        if (!req.body.title) res.status(400).send('New entry missing title field')
        if (!req.body.money) res.status(400).send('New entry missing money field')

        const { user_id } = res.locals
        const { date, title, money } = req.body
        try {
            const resp = await EntryModel.create({ user_id, date, title, money })
            res.status(200).json(resp)
        } catch (error) {
            console.warn(error)
            res.status(500).json(error)
        }
    })

    api.delete('/entries/:id', checkSession, async (req, res) => {
        try {
            await EntryModel.remove(req.params.id)
            res.status(200).send(`Deleted entry ${req.params.id}`)
        } catch (error) {
            console.warn(error)
            res.status(500).json(error)
        }
    })

    api.get('/account', checkSession, async (req, res) => {
        const { user_id } = res.locals

        let resp = await AccountModel.select(req.body, `user_id = '${user_id}'`)

        if (resp.rows.length) {
            res.status(200).json({
                account: resp.rows[0]
            })
        } else {
            await AccountModel.create({ user_id, balance: 0 })
            resp = await AccountModel.select(req.body,`user_id = '${user_id}'`)
            res.status(200).json({
                account: resp.rows[0]
            })
        }
    })

    api.post('/account', checkSession, async (req, res) => {
        const { user_id } = res.locals
        try {
            await AccountModel.create({
                user_id,
                balance: req.body.balance || 0
            })
            res.status(200).json(req.body)
        } catch (error) {
            console.warn(error)
            res.status(500).json(error)
        }
    })

    api.put('/account', checkSession, async (req, res) => {
        if (!req.body.balance && req.body.balance !== 0) {
            res.status(400).send('Update account requires balance field')
        }

        const { user_id } = res.locals
        try {
            await AccountModel.update({ balance: req.body.balance },
                `user_id = '${user_id}'`)
            res.status(200).json({ user_id, balance: req.body.balance })
        } catch (error) {
            console.warn(error)
            res.status(500).json(error)
        }
    })

    return api
}
