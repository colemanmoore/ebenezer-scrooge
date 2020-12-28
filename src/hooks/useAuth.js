import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { sessionLogin } from './useApi'

const config = {
    apiKey: "AIzaSyCafxmJC1XIgE_txQifA6gC_hWpgVTv9T0",
    authDomain: "finfuture-31e00.firebaseapp.com",
    databaseURL: "https://finfuture-31e00.firebaseio.com",
    projectId: "finfuture-31e00",
    storageBucket: "finfuture-31e00.appspot.com",
    messagingSenderId: "468294236972",
    appId: "1:468294236972:web:04cde1f7a83e42e99d8a89"
}

let app

try {
    app = firebase.initializeApp(config)
} catch (error) {
    app = firebase.app()
}

const authentication = app.auth()
authentication.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const provider = new firebase.auth.GoogleAuthProvider()

const authContext = createContext()

export const useAuth = () => useContext(authContext)

export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useProvideAuth() {

    const [user, setUser] = useState(false)
    const [authorized, setAuthorized] = useState(false)

    const login = async () => {
        let resp, idToken, user

        try {
            resp = await authentication.signInWithPopup(provider)
        } catch (error) {
            console.log('Sign in with popup failed')
            return false
        }

        if (!resp.user || !resp.user.providerData) {
            console.log('Received invalid user from Firebase')
            return false
        }

        try {
            idToken = await resp.user.getIdToken()
        } catch (error) {
            console.log('Error getting user ID token')
            return false
        }

        try {
            await sessionLogin(idToken)
            setAuthorized(true)
        } catch (error) {
            console.log('Error setting session with service')
            console.log(error)
            return false
        }

        user = { ...resp.user.providerData[0] }
        console.log('session login done', user)
        setUser(user)
        return user
    }

    const logout = async () => {
        await authentication.signOut()
        setUser(false)
    }

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(user => {
            if (user && user.providerData && user.providerData.length) {
                setUser(user.providerData[0])
            } else {
                setUser(false)
            }
        })

        return () => unsubscribe()
    }, [])

    return {
        user,
        authorized,
        login,
        logout
    }
}