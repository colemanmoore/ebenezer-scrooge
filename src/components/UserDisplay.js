import React, {useEffect, useState} from 'react'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm'
import EntriesDisplay from './EntriesDisplay'
import Api from '../util/api'

export default function UserDisplay({ userId }) {

    const api = new Api({ userId })
    api.authorize()

    const [balance, setBalance] = useState(null)
    const [entries, setEntries] = useState([])
    const [account, setAccount] = useState({})

    useEffect(() => {
        api.getAccount({ userId }).then(resp => {
            setAccount(resp.data.account)
            setBalance(resp.data.account.balance)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        api.listFutureEntries({ userId }).then(resp => {
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
        api.addEntry({...entry, userId}).then(() => {
            return api.listFutureEntries({ userId })
        }).then(resp => {
            setEntries(resp.data.entries)
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteEntry = entryId => {
        api.deleteEntry(entryId).then(() => {
            return api.listFutureEntries({ userId })
        }).then(resp => {
            setEntries(resp.data.entries)
        }).catch(err => {
            console.log(err)
        })
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