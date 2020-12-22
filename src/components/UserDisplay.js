import React, {useEffect, useState} from 'react'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm'
import EntriesDisplay from './EntriesDisplay'
import Api from '../util/api'

export default function UserDisplay({ userId }) {

    let api = new Api()

    const [balance, setBalance] = useState(null)
    const [entries, setEntries] = useState([])
    const [account, setAccount] = useState(null)

    useEffect(async () => {
        if (userId) {
            const resp = await api.getAccount({ userId })
            setAccount(resp.data.account)
            setBalance(resp.data.account.balance)
        }
    }, [userId])

    useEffect(async () => {
        if (account) {
            try {
                const resp = await api.listFutureEntries({ userId })
                setEntries(resp.data.entries)
            } catch (err) {
                console.log(err)
            }
        }
    }, [account])

    useEffect(async() => {
        if (account && balance && balance !== 0) {
            console.log(account)
            await api.updateAccount({ userId, balance })
        }
    }, [balance])

    const addEntry = async entry => {
        try {
            await api.addEntry({...entry, userId})
            const resp = await api.listFutureEntries({ userId })
            setEntries(resp.data.entries)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteEntry = async entryId => {
        try {
            await api.deleteEntry(entryId)
            const resp = await api.listFutureEntries({ userId })
            setEntries(resp.data.entries)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <CurrentBalance balance={balance} updateBalance={setBalance}/>
                <EntryForm addEntry={addEntry} />
            </div>
            <EntriesDisplay balance={balance} entries={entries} deleteEntry={deleteEntry} />
        </div>
    )
}