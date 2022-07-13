import React, { useEffect } from 'react'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm'
import EntriesDisplay from './EntriesDisplay'
import AccountInfo from './AccountInfo'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../hooks/useAuth'
import LoadingMessage from "./LoadingMessage";
import styled from 'styled-components';

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
    <Container>
      <AccountInfo user={auth.user} logout={auth.logout} />
      <FormArea>
        <CurrentBalance />
        <EntryForm />
      </FormArea>
      {api.fetching? <LoadingMessage /> : <EntriesDisplay /> }
    </Container>
  )
}

const Container = styled.section`
  @media screen and (min-width: 600px) {
    padding: 0 100px;
  }
  @media screen and (min-width: 900px) {
    padding: 0 200px;
  }
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default UserDisplay
