import React, { useState } from 'react'
import TopHeader from './TopHeader'
import UserDisplay from './UserDisplay'
import auth from '../util/auth'
import LoginControl from './LoginControl'

function App() {

    const [userId, setUserId] = useState(null)

    const login = async () => {
        const res = await auth.loginPopup()
        setUserId(res.id)
    }

    return (
        <div>
            <TopHeader />
            {
                !userId ?
                    <LoginControl doLogin={login} />
                    : <UserDisplay userId={userId} />
            }
        </div>
    )
}

export default App
