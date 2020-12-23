import React, { useState } from 'react'
import TopHeader from './TopHeader'
import UserDisplay from './UserDisplay'
import auth from '../util/auth'

function App() {

    const [userId, setUserId] = useState(null)

    const token = auth.getToken()

    const login = () => {
        auth.loginPopup().then(res => {
            setUserId(res.id)
        })
    }

    return (
        <div>
            <TopHeader />
            {
                !userId ?
                    <a onClick={login}>With whom am I speaking</a>
                    : <UserDisplay userId={userId} />
            }
        </div>
    )
}

export default App
