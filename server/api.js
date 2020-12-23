import { Router } from 'express'
import { AccountModel } from './datastore/account'
import { EntryModel } from './datastore/entry'

export default () => {
    let api = Router();

    api.get('/', (req, res) => res.json({ message: 'Welcome to the api' }))

    api.get('/entries', async (req, res) => {
        try {
            const resp = await EntryModel.select(req.query,`date >= '${req.query.after}'`)
            res.status(200).json({ entries: resp.rows })
        } catch (error) {
            console.warn(error)
            res.status(500).json({ error })
        }
    })

    api.post('/entries', async (req, res) => {
        if (!req.body.user_id) res.status(400).send('New entry missing user_id field')
        if (!req.body.date) res.status(400).send('New entry missing date field')
        if (!req.body.title) res.status(400).send('New entry missing title field')
        if (!req.body.money) res.status(400).send('New entry missing money field')

        try {
            const resp = await EntryModel.create(req.body)
            res.status(200).json(resp)
        } catch (error) {
            console.warn(error)
            res.status(500).json({ error })
        }
    })

    api.delete('/entries/:id', (req, res) => {
        try {
            const resp = EntryModel.remove(req.params.id)
            res.status(200).json(resp)
        } catch (error) {
            console.warn(error)
            res.status(500).json({ error })
        }
    })

    api.get('/account/:user_id', async (req, res) => {
        const { user_id } = req.params

        try {
            let resp = await AccountModel.select(req.body, `user_id = '${user_id}'`)
            if (resp.rows.length) {
                res.status(200).json({
                    account: resp.rows[0]
                })
            } else {
                await AccountModel.create({ user_id, balance: 0 })
                resp = await AccountModel.select(req.body,`user_id = '${user_id}'`)
                console.log('----', resp.rows)
                res.status(200).json({
                    account: resp.rows[0]
                })
            }
        } catch (error) {
            console.warn(error)
            res.status(500).json({ error })
        }
    })

    api.post('/account', async (req, res) => {
        if (!req.body.user_id) res.status(400).send('New account missing user_id field')

        try {
            await AccountModel.create(req.body)
            res.status(200).json(req.body)
        } catch (error) {
            console.warn(error)
            res.status(500).json({ error })
        }
    })

    api.put('/account/:user_id', async (req, res) => {
        if (!req.body.balance && req.body.balance !== 0) res.status(400).send('Update account requires balance field')

        try {
            const resp = await AccountModel.update({ balance: req.body.balance },
                `user_id = '${req.params.user_id}'`)
            res.status(200).json(resp)
        } catch (error) {
            console.warn(error)
            res.status(500).json({ error })
        }
    })

    return api
}
