import React, { useState, useEffect } from 'react'
import TopHeader from './TopHeader'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm'
import EntriesDisplay from './EntriesDisplay'
import api from '../util/api'
// import { initializeFirebase } from '../util/oauth'

const USER_ID = 'asdf'

function App() {

    const [account, setAccount] = useState({})
    const [balance, setBalance] = useState(null)
    const [entries, setEntries] = useState([])

    useEffect(() => {
        // initializeFirebase()
    }, [])

    useEffect(() => {
        api.getAccount({ userId: USER_ID }).then(resp => {
            setAccount(resp.data.account)
            setBalance(resp.data.account.balance)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        api.listFutureEntries({ userId: USER_ID }).then(resp => {
            setEntries(resp.data.entries)
        }).catch(err => {
            console.log(err)
        })
    }, [account])

    useEffect(() => {
        if (balance && balance !== 0) {
            api.updateAccount({ ...account, balance }).then(() => {}).catch(err => {
                console.log(err)
            })
        }
    }, [balance])

    const addEntry = entry => {
        api.addEntry({...entry, userId: USER_ID}).then(() => {
            return api.listFutureEntries({ userId: USER_ID })
        }).then(resp => {
            setEntries(resp.data.entries)
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteEntry = entryId => {
        api.deleteEntry(entryId).then(() => {
            return api.listFutureEntries({ userId: USER_ID })
        }).then(resp => {
            setEntries(resp.data.entries)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <TopHeader />
            <div style={{display:'flex', justifyContent: 'center'}}>
                <CurrentBalance balance={balance} updateBalance={setBalance}/>
                <EntryForm addEntry={addEntry} />
            </div>
            <EntriesDisplay balance={balance} entries={entries} deleteEntry={deleteEntry} />
        </div>
    )
}

export default App
