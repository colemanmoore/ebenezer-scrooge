import axios from 'axios'
import moment from 'moment'
import auth from './auth'

class Api {
    constructor() {
        this.TIMEOUT = 30000
        this.xhr = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            timeout: this.TIMEOUT
        })
        this.token = null
    }

    getAccount({ userId }) {
        return this.xhr.get(`/account/${userId}`, {
            headers: { authorization: `Bearer ${auth.getToken()}`},
            authToken: auth.getToken()
        })
    }

    updateAccount({ userId, balance }) {
        return this.xhr.put(`/account/${userId}`, {
            user_id: userId,
            balance
        }, {
            headers: { authorization: `Bearer ${auth.getToken()}`}
        })
    }

    listAllEntries({afterDate, userId }) {
        const params = { user_id: userId }
        if (afterDate) {
            params.after = moment(afterDate).format('YYYY-MM-DD HH:mm:ss')
        }
        return this.xhr.get('/entries', {
            params: params,
            headers: { authorization: `Bearer ${auth.getToken()}`}
        })
    }

    listFutureEntries({ userId }) {
        return this.xhr.get('/entries', {
            params: {
                user_id: userId,
                after: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            },
            headers: { authorization: `Bearer ${auth.getToken()}`}
        })
    }

    addEntry({ userId, date, title, money}) {
        return this.xhr.post('/entries', { user_id: userId, date, title, money }, {
            headers: { authorization: `Bearer ${auth.getToken()}`}
        })
    }

    deleteEntry(id) {
        return this.xhr.delete(`/entries/${id}`, {
            headers: { authorization: `Bearer ${auth.getToken()}`}
        })
    }
}

export default Api
