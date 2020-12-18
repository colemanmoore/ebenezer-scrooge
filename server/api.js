import { Router } from 'express'
import { AccountModel } from './models/account'
import { EntryModel } from './models/entry'

export default () => {
    let api = Router();

    api.get('/', (req, res) => res.json({ message: 'Welcome to the api' }))

    api.get('/entries', (req, res) => {
        EntryModel.select('*', ` WHERE user_id = '${req.query.userId}'`).then(resp => {
            res.status(200).json({ entries: resp.rows })
        }).catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
    })

    api.post('/entries', (req, res) => {
        EntryModel.create(req.body).then(resp => {
            return res.status(200).json(resp)
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ err })
        })
    })

    api.delete('/entries', (req, res) => {
        EntryModel.remove()
    })

    api.get('/account', (req, res) => {
        console.log('GET /account')
        AccountModel.select('*', ` WHERE user_id=${req.params.userId}`).then(resp => {
            console.log('*** ', resp)
        })
    });

    api.post('/account', (req, res) => {
        // if (!req.body.userId) {
        //     res.status(400).send('New account missing userId field');
        // }
        //
        // if (!req.body.balance && req.body.balance !== 0) {
        //     res.status(400).send('New account missing balance field');
        // }
        //
        // const account = new Account(db)({
        //     userId: req.body.userId,
        //     balance: req.body.balance
        // });
        //
        // account.save(err => {
        //     if (err) return handleError(err);
        //     res.json({ account: account });
        // });
    });

    api.put('/account', (req, res) => {
        // Account(db).update({ userId: req.body.userId }, req.body, (err, raw) => {
        //     if (err) return handleError(err);
        //     res.json({ account: req.body });
        // });
    });

    return api;

    function handleError(err) {
        console.log('Error:');
        console.log(err);
        res.status(500).send({ error: err });
        return err;
    }
}
