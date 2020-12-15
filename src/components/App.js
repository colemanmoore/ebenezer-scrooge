import React, { useState, useEffect } from 'react'
import TopHeader from './TopHeader'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm'
import EntriesDisplay from './EntriesDisplay'
import api from '../util/api'

const USER_ID = ''

function App() {

    const [balance, setBalance] = useState(null)
    const [entries, setEntries] = useState([])

    useEffect(() => {
        api.getAccount({ userId: USER_ID }).then(resp => {
            setBalance(resp.data.account.balance)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        refreshEntries().then(resp => {
            console.log(resp.data)
            setEntries(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }, [balance])

    function refreshEntries() {
        return api.listFutureEntries({ userId: USER_ID })
    }

    return (
        <div>
            <TopHeader />
            <div style={{display:'flex', justifyContent: 'center'}}>
                <CurrentBalance balance={balance} setBalance={setBalance} />
                <EntryForm />
            </div>
            <EntriesDisplay balance={balance} entries={entries} />
        </div>
    )
}

export default App
