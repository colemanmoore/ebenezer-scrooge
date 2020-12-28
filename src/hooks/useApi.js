import React, { createContext, useContext, useState } from 'react'
import moment from 'moment'
import xhr from '../util/xhr'
import { useAuth } from './useAuth'

const apiContext = createContext()

export const useApi = () => useContext(apiContext)

export function ProvideApi({ children }) {
    const api = useProvideApi()
    return <apiContext.Provider value={api}>{children}</apiContext.Provider>
}

function useProvideApi() {

    const auth = useAuth()

    const [entries, setEntries] = useState([])
    const [account, setAccount] = useState(null)

    const getAccount = async () => {
        try {
            const res = await xhr.get(`/account`)
            setAccount({
                balance: res.data.account.balance,
                userId: res.data.account.user_id
            })
        } catch (error) {
            setAccount(null)
        }
    }

    const updateAccount = async ({ balance }) => {
        const res = await xhr.put(`/account`, { balance })
        setAccount(res.data)
    }

    const refreshEntries = async () => {
        try {
            const res = await xhr.get('/entries', {
                params: {
                    after: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                }
            })
            setEntries(res.data.entries)
        } catch (error) {
            setEntries([])
        }
    }

    const addEntry = async ({ date, title, money}) => {
        try {
            await xhr.post('/entries', { date, title, money })
        } catch (error) {
            return Promise.reject('Error adding entry')
        }

        await refreshEntries({ userId: account.userId })
    }

    const deleteEntry = entryId => {
        return xhr.delete(`/entries/${entryId}`)
    }

    xhr.interceptors.response.use(response => response, error => {
        switch (error.response.status) {
            case 401:
                auth.logout()
                break;
            default: {
                return Promise.reject(error)
            }
        }
    })

    return {
        getAccount,
        updateAccount,
        refreshEntries,
        addEntry,
        deleteEntry,
        entries,
        account
    }
}

export const sessionLogin = (idToken) => {
    return xhr.post('/login', { idToken })
}