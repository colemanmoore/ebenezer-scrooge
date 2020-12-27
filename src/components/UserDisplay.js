import React, { useEffect } from 'react'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm'
import EntriesDisplay from './EntriesDisplay'
import AccountInfo from './AccountInfo'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../hooks/useAuth'

const UserDisplay = () => {

    const api = useApi()
    const auth = useAuth()

    const userId = auth.user.uid

    useEffect(() => {
        try {
            api.getAccount({ userId })
        } catch (error) {
            console.log('error getting account:', error)
        }
    }, [])

    useEffect(() => {
        if (api.account) {
            try {
                api.refreshEntries({ userId })
            } catch (err) {
                console.log(err)
            }
        }
    }, [api.account])
    //
    // useEffect(() => {
    //     (async() => {
    //         if (account && balance && balance !== 0) {
    //             await api.updateAccount({ userId, balance })
    //         }
    //     })()
    // }, [balance])

    return (
        <div>
            <AccountInfo user={auth.user} />
            <div style={{display:'flex', justifyContent: 'center', marginTop: '40px'}}>
                <CurrentBalance />
                <EntryForm />
            </div>
            <EntriesDisplay />
        </div>
    )
}

export default UserDisplay