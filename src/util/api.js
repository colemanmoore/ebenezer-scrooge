import axios from 'axios'

const xhr = axios.create({
    timeout: 30000
})

export default {
    getAccount,
    addAccount,
    updateAccount,
    listEntries,
    addEntry,
    deleteEntry
}

function getAccount({ userId }) {
    return xhr.get('/account', { params: { userId }})
}

function updateAccount(account) {
    return xhr.put('/account', account)
}

function addAccount(account) {
    return xhr.post('/account', account)
}

function listEntries({afterDate, userId }) {
    const params = { userId }
    if (afterDate) {
        params.after = afterDate.toJSON()
    }
    return xhr.get('/entries', { params: params })
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
