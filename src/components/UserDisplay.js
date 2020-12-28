import React, { useEffect } from 'react'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm/EntryForm'
import EntriesDisplay from './EntriesDisplay'
import AccountInfo from './AccountInfo'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../hooks/useAuth'
import LoadingMessage from "./LoadingMessage";

const UserDisplay = () => {

    const api = useApi()
    const auth = useAuth()

    useEffect(() => {
        try {
            api.getAccount()
        } catch (error) {
            console.log('error getting account:', error)
        }
    }, [])

    useEffect(() => {
        if (api.account) {
            try {
                api.refreshEntries()
            } catch (err) {
                console.log('error refreshing entries:', err)
            }
        }
    }, [api.account])

    return (
        <div>
            <AccountInfo user={auth.user} />
            <div style={{display:'flex', justifyContent: 'center', marginTop: '40px'}}>
                <CurrentBalance />
                <EntryForm />
            </div>
            {api.fetching? <LoadingMessage /> : <EntriesDisplay /> }
        </div>
    )
}

export default UserDisplay