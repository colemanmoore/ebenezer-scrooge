import { Router } from 'express'

export default () => {
    let api = Router();

    api.get('/entries', (req, res) => {
        res.send([
            { date: '3/17/2021', title: 'coronavirus', debt: '-300000' },
            { date: '12/10/2021', title: 'today', debt: '-50' },
            { date: '6/17/2021', title: 'birthda', income: '500' }
        ])
    })

    api.get('/account', (req, res) => {
        res.json({
            account: {
                userId: '234',
                balance: 666
            }
        })
    })

    api.put('account', (req, res) => {
        res.send(200)
    })

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
