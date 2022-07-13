import React from 'react';
import {useAuth} from '../hooks/useAuth';
import {ProvideApi} from '../hooks/useApi';
import TopHeader from './TopHeader';
import UserDisplay from './UserDisplay';
import LoginControl from './LoginControl';

function App() {

  const auth = useAuth();

  return (
    <article>
      <TopHeader/>
      {auth.authorized ?
        <ProvideApi>
          <UserDisplay/>
        </ProvideApi>
        : <LoginControl doLogin={auth.login}/>
      }
    </article>
  );
}

export default App;
