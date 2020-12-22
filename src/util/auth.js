import cookies from 'js-cookie'
import { authentication, provider } from './firebase'

const tokenKey = 'scrooge_token'

class Auth {
    constructor() {
        this.token = null
    }

    getToken() {
        if (!this.token) {
            this.token = cookies.get(tokenKey)
        }
        if (!this.token) {
            authentication.currentUser.getIdToken(false)
        }
        return this.token
    }

    setToken(token) {
        this.token = token
        cookies.set(tokenKey, token)
    }

    loginPopup() {
        return authentication.signInWithPopup(provider).then(result => {
            const { profile } = result.additionalUserInfo
            this.setToken(result.credential.idToken)
            return {...profile}
        })
    }

    logout() {
        cookies.remove(tokenKey)
    }
}

export default new Auth()