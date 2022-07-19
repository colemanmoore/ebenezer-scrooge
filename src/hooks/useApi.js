import React, {createContext, useContext, useState} from 'react';
import moment from 'moment';
import xhr from '../util/xhr';
import {useAuth} from './useAuth';

const apiContext = createContext();

export const useApi = () => useContext(apiContext);

export function ProvideApi({children}) {
  const api = useProvideApi();
  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
}

function useProvideApi() {

  const auth = useAuth();
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(null);
  const [userId, setUserId] = useState(null);
  const [fetching, setFetching] = useState(false);

  const getAccount = async () => {
    setFetching(true);
    let account;
    try {
      const res = await xhr.get('/account');
      account = res.data.account;
      setBalance(account.balance);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
    return account
  };

  const updateAccount = async ({balance}) => {
    setFetching(true);
    let account;
    try {
      const res = await xhr.put(`/account`, {balance});
      account = res.data.account;
      setBalance(balance);
      setUserId(userId);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
    return account;
  };

  const refreshEntries = async () => {
    setFetching(true);
    let entries = [];
    try {
      const res = await xhr.get('/entries', {
        params: {
          after: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      });
      entries = res.data.entries;
      setEntries(entries);
    } catch (error) {
      console.error(error)
    } finally {
      setFetching(false);
    }
    return entries;
  };

  const addEntry = async ({date, title, money}) => {
    setFetching(true);
    try {
      await xhr.post('/entries', {date, title, money});
    } catch (error) {
      console.error('Error adding entry', error);
    }
    await refreshEntries({userId});
    setFetching(false);
  };

  const deleteEntry = entryId => {
    return xhr.delete(`/entries/${entryId}`);
  };

  xhr.interceptors.response.use(response => response, error => {
    switch (error.response.status) {
      case 401:
        auth.logout();
        break;
      default: {
        return Promise.reject(error);
      }
    }
  });

  return {
    getAccount,
    updateAccount,
    refreshEntries,
    addEntry,
    deleteEntry,
    entries,
    balance,
    userId,
    fetching,
    setFetching,
  };
}
