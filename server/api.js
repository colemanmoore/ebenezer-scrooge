import { Router } from 'express'
import { AccountModel } from './models/account'
import { EntryModel } from './models/entry'

export default () => {
    let api = Router();

    api.get('/', (req, res) => res.json({ message: 'Welcome to the api' }))

    api.get('/entries', (req, res) => {
        EntryModel.select(req.query, `date >= '${req.query.after}'`).then(resp => {
            res.status(200).json({ entries: resp.rows })
        }).catch(err => {
            console.warn(err)
            res.status(500).json({ error: err })
        })
    })

    api.post('/entries', (req, res) => {
        if (!req.body.user_id) res.status(400).send('New entry missing user_id field')
        if (!req.body.date) res.status(400).send('New entry missing date field')
        if (!req.body.title) res.status(400).send('New entry missing title field')
        if (!req.body.money) res.status(400).send('New entry missing money field')

        EntryModel.create(req.body).then(resp => {
            res.status(200).json(resp)
        }).catch(err => {
            console.warn(err)
            res.status(500).json({ error: err })
        })
    })

    api.delete('/entries/:id', (req, res) => {
        EntryModel.remove(req.params.id).then(resp => {
            res.status(200).json(resp)
        }).catch(err => {
            console.warn(err)
            res.status(500).json({ error: err })
        })
    })

    api.get('/account', (req, res) => {
        AccountModel.select(req.body).then(resp => {
            const { user_id, balance } = resp.rows[0]
            res.status(200).json({
                account: { userId: user_id, balance }
            })
        }).catch(err => {
            console.warn(err)
            res.status(500).json({ error: err })
        })
    })

    api.post('/account', (req, res) => {
        if (!req.body.user_id) res.status(400).send('New account missing user_id field')
        if (!req.body.balance && req.body.balance !== 0) res.status(400).send('New account missing balance field')

        AccountModel.create(req.body).then(resp => {
            res.status(200).json(req.body)
        }).catch(err => {
            console.warn(err)
            res.status(500).json({ error: err })
        })
    })

    api.put('/account', (req, res) => {
        if (!req.body.user_id) res.status(400).send('Update account requires user_id field')
        if (!req.body.balance && req.body.balance !== 0) res.status(400).send('Update account requires balance field')

        AccountModel.update({ balance: req.body.balance },
            `user_id = '${req.body.user_id}'`).then(resp => {
                res.status(200).json(resp)
            })
    })

    return api
}
