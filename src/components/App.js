import React, { useState, useEffect } from 'react'
import TopHeader from './TopHeader'
import UserDisplay from './UserDisplay'
import auth from '../util/auth'

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = () => {
        auth.loginPopup().then(res => {
            setIsLoggedIn(true)
            setUserId(res.id)
        })
    }

    return (
        <div>
            <TopHeader />
            {
                !isLoggedIn ?
                    <a onClick={login}>Log in plz</a>
                    : <UserDisplay userId={userId} />
            }
        </div>
    )
}

export default App
