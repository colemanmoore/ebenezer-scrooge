import axios from 'axios'
import moment from 'moment'

const xhr = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 30000
})

export default {
    getAccount,
    addAccount,
    updateAccount,
    listAllEntries,
    listFutureEntries,
    addEntry,
    deleteEntry
}

function getAccount({ userId }) {
    return xhr.get('/account', { params: { user_id: userId }})
}

function updateAccount({ userId, balance }) {
    return xhr.put('/account', { user_id: userId, balance })
}

function addAccount(account) {
    return xhr.post('/account', account)
}

function listAllEntries({afterDate, userId }) {
    const params = { userId }
    if (afterDate) {
        params.after = afterDate.toJSON()
    }
    return xhr.get('/entries', { params: params })
}

function listFutureEntries({ userId }) {
    return xhr.get('/entries', {
        params: {
            user_id: userId,
            after: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
    })
}

function addEntry({ userId, date, title, money}) {
    return xhr.post('/entries', { user_id: userId, date, title, money })
}

function deleteEntry(id) {
    return xhr.delete(`/entries/${id}`)
}
