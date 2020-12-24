import cookies from 'js-cookie'
import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCafxmJC1XIgE_txQifA6gC_hWpgVTv9T0",
    authDomain: "finfuture-31e00.firebaseapp.com",
    databaseURL: "https://finfuture-31e00.firebaseio.com",
    projectId: "finfuture-31e00",
    storageBucket: "finfuture-31e00.appspot.com",
    messagingSenderId: "468294236972",
    appId: "1:468294236972:web:04cde1f7a83e42e99d8a89"
}

const app = firebase.initializeApp(config)
const authentication = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

const tokenKey = 'scrooge_token'

// https://firebase.google.com/docs/auth/web/google-signin

class Auth {
    constructor() {
        this.token = null
    }

    getToken() {
        if (!this.token) {
            this.token = cookies.get(tokenKey)
        }
        if (!this.token) {
            this.token = authentication.currentUser.getIdToken(false)
        }
        console.log(this.token)
        return this.token
    }

    async loginPopup() {
        const result = await authentication.signInWithPopup(provider)
        const { profile } = result.additionalUserInfo
        return {...profile}
    }

    async logout() {
        await authentication.signOut()
        cookies.remove(tokenKey)
    }
}

export default new Auth()