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
  const [fetching, setFetching] = useState(false)

  const getAccount = async () => {
    setFetching(true)
    try {
      const res = await xhr.get(`/account`)
      setAccount({
        balance: res.data.account.balance,
        userId: res.data.account.user_id
      })
    } catch (error) {
      setAccount(null)
    } finally {
      setFetching(false)
    }
  }

  const updateAccount = async ({ balance }) => {
    setFetching(true)
    const res = await xhr.put(`/account`, { balance })
    setAccount(res.data)
    setFetching(false)
  }

  const refreshEntries = async () => {
    setFetching(true)
    try {
      const res = await xhr.get('/entries', {
        params: {
          after: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      setEntries(res.data.entries)
    } catch (error) {
      setEntries([])
    } finally {
      setFetching(false)
    }
  }

  const addEntry = async ({ date, title, money}) => {
    setFetching(true)
    try {
      await xhr.post('/entries', { date, title, money })
    } catch (error) {
      return Promise.reject('Error adding entry')
    }

    await refreshEntries({ userId: account.userId })
    setFetching(false)
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
    account,
    fetching,
    setFetching
  }
}
