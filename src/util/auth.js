import { authentication, provider } from './firebase'

class Auth {
    constructor() {
        this.token = null
    }

    getToken() {
        console.log('get token', this.token)
        return this.token
    }

    loginPopup() {
        return authentication.signInWithPopup(provider).then(result => {
            const { profile } = result.additionalUserInfo
            this.token = result.credential.idToken;
            return {...profile}
        })
    }

    logout() {

    }
}

export default new Auth()