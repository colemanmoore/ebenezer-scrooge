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
    // return xhr.get('/account', { params: { userId }})
    return Promise.resolve({
        data: {
            account: { userId: 'asdf', balance: 155 }
        }
    })
}

function updateAccount(account) {
    return xhr.put('/account', account)
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
    // return xhr.get('/entries', { params: { userId, after: moment().toDate() } })
    return Promise.resolve({
        data: [
            { id: '0', date: '12/10/2021', title: 'today', money: -240 },
            { id: '1', date: '6/17/2021', title: 'birthday', money: 520 }
        ]
    })
}

function addEntry(entry) {
    return xhr.post('/entries', entry)
}

function updateEntry(entry) {
    return xhr.put(`/entries/${entry.id}`, entry)
}

function deleteEntry(id) {
    return xhr.delete(`/entries/${id}`)
}
