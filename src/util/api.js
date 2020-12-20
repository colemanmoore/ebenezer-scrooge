import axios from 'axios'
import moment from 'moment'
import auth from './auth'

class Api {
    constructor() {
        this.TIMEOUT = 30000
        this.xhr = null
        this.token = null
    }

    authorize() {
        console.log('authorize--', auth.getToken())
        this.xhr = axios.create({
            baseURL: process.env.API_URL,
            timeout: this.TIMEOUT,
            headers: { authorization: `Bearer ${auth.getToken()}`}
        })
    }

    getAccount({ userId }) {
        return this.xhr.get('/account', { params: { user_id: userId }})
    }

    addAccount(account) {
        return this.xhr.post('/account', account)
    }

    updateAccount({ userId, balance }) {
        return this.xhr.put('/account', { user_id: userId, balance })
    }

    listAllEntries({afterDate, userId }) {
        const params = { userId }
        if (afterDate) {
            params.after = afterDate.toJSON()
        }
        return this.xhr.get('/entries', { params: params })
    }

    listFutureEntries({ userId }) {
        return this.xhr.get('/entries', {
            params: {
                user_id: userId,
                after: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
        })
    }

    addEntry({ userId, date, title, money}) {
        return this.xhr.post('/entries', { user_id: userId, date, title, money })
    }

    deleteEntry(id) {
        return this.xhr.delete(`/entries/${id}`)
    }
}

export default Api
