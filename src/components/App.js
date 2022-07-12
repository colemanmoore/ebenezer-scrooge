import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { ProvideApi } from '../hooks/useApi'
import TopHeader from './TopHeader'
import UserDisplay from './UserDisplay'
import LoginControl from './LoginControl/LoginControl'

function App() {

  const auth = useAuth()

  return (
    <div>
      <TopHeader />
      {auth.authorized ?
        <ProvideApi>
          <UserDisplay />
        </ProvideApi>
        : <LoginControl doLogin={auth.login} />
      }
    </div>
  )
}

export default App
