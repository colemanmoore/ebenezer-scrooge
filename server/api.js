import { Router } from 'express'
import resource from './resourceRouter'
import Entry from './models/entries'
import Account from './models/accounts'

export default ({ db }) => {
    let api = Router();

    api.use('/entries', resource({
        propertyName: 'entry',
        model: Entry(db)
    }));

    api.get('/account', (req, res) => {
        Account(db).find({ userId: req.query.userId }).exec().then(result => {
            if (result.length === 0) {
                res.status(404).send(`No account found for userId: "${req.params.userId}"`);
            } else {
                res.json({ account: result[0] });
            }
        });
    });

    api.post('/account', (req, res) => {
        if (!req.body.userId) {
            res.status(400).send('New account missing userId field');
        }

        if (!req.body.balance && req.body.balance !== 0) {
            res.status(400).send('New account missing balance field');
        }

        const account = new Account(db)({
            userId: req.body.userId,
            balance: req.body.balance
        });

        account.save(err => {
            if (err) return handleError(err);
            res.json({ account: account });
        });
    });

    api.put('/account', (req, res) => {
        Account(db).update({ userId: req.body.userId }, req.body, (err, raw) => {
            if (err) return handleError(err);
            res.json({ account: req.body });
        });
    });

    api.get('/', (req, res) => {
        res.json({ message: 'Welcome to the api' });
    });

    return api;

    function handleError(err) {
        console.log('Error:');
        console.log(err);
        res.status(500).send({ error: err });
        return err;
    }
}
