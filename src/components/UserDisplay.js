import React, {useEffect} from 'react';
import CurrentBalance from './CurrentBalance';
import EntryForm from './EntryForm';
import EntriesDisplay from './EntriesDisplay';
import AccountInfo from './AccountInfo';
import LoadingMessage from './LoadingMessage';
import styled from 'styled-components';
import {useApi} from '../hooks/useApi';

const UserDisplay = () => {

  const {getAccount, fetching} = useApi();

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <Container>
      <AccountInfo/>
      <FormArea>
        <CurrentBalance/>
        <EntryForm/>
      </FormArea>
      {fetching? <LoadingMessage /> : <EntriesDisplay /> }
    </Container>
  );
};

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

export default UserDisplay;
