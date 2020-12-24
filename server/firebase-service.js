import * as admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://finfuture-31e00.firebaseio.com'
})

export default admin