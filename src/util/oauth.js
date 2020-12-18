import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider()

export function initializeFirebase() {
    try {
        firebase.app()
    } catch(e) {
        firebase.initializeApp(FIREBASE_CONFIG)
    }
}

export function loginWithOAuth() {
    return firebase.auth().signInWithPopup(provider).then(result => ({
        firstName: result.additionalUserInfo.profile.given_name,
        lastName: result.additionalUserInfo.profile.family_name,
        email: result.additionalUserInfo.profile.email
    })).catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
    })
}

export function logoutWithOAuth() {
    return firebase.auth().signOut()
        .catch(function(error) {
            console.log('Error logging out')
            console.log(error)
        })
}