import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider()

function initializeFirebase() {
    try {
        firebase.app()
    } catch(e) {
        firebase.initializeApp(FIREBASE_CONFIG)
    }
}

function loginWithOAuth() {
    return firebase.auth().signInWithPopup(provider).then(result => ({
        firstName: result.additionalUserInfo.profile.given_name,
        lastName: result.additionalUserInfo.profile.family_name,
        email: result.additionalUserInfo.profile.email
    })).catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
    })
}

function logoutWithOAuth() {
    return firebase.auth().signOut()
        .catch(function(error) {
            console.log('Error logging out')
            console.log(error)
        })
}

export { initializeFirebase, loginWithOAuth }