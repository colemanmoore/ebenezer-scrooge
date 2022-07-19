import React from 'react';
import {useAuth} from '../hooks/useAuth';
import {ProvideApi} from '../hooks/useApi';
import TopHeader from './TopHeader';
import UserDisplay from './UserDisplay';
import LoginControl from './LoginControl';

function App() {

  const {authorized, login} = useAuth();

  return (
    <article>
      <TopHeader/>
      {authorized ?
        <ProvideApi>
          <UserDisplay/>
        </ProvideApi>
        : <LoginControl doLogin={login}/>
      }
    </article>
  );
}

export default App;
