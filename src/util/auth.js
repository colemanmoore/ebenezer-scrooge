import cookies from 'js-cookie'
import { authentication, provider } from './firebase'

const tokenKey = 'scrooge_token'

class Auth {
    constructor() {
        this.user = null
    }

    getToken() {
        if (!this.user) {
            return
        }

        if (!this.user.token) {
            this.user.token = cookies.get(tokenKey)
        }
        if (!this.user.token) {
            this.user.token = authentication.currentUser.getIdToken(false)
        }
        return this.user.token
    }

    setToken(token) {
        this.user.token = token
        cookies.set(tokenKey, token)
    }

    loginPopup() {
        return authentication.signInWithPopup(provider).then(result => {
            const { profile } = result.additionalUserInfo
            this.user = {
                userId: profile.id,
                token: result.credential.idToken
            }
            return {...profile}
        })
    }

    logout() {
        cookies.remove(tokenKey)
    }
}

export default new Auth()