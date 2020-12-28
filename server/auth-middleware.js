import * as admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://finfuture-31e00.firebaseio.com'
})

export const createSessionCookie = async (req, res, next) => {
    const idToken = req.body.idToken.toString()
    // const csrfToken = req.body.csrfToken.toString()
    // if (csrfToken !== req.cookies.csrfToken) {
    //     res.status(401).send('UNAUTHORIZED REQUEST!')
    //     return
    // }
    const expiresIn = 14 * 24 * 60 * 60 * 1000 // 2 weeks is the max
    try {
        const sessionCookie = await admin.auth()
            .createSessionCookie(idToken, { expiresIn })
        const options = { maxAge: expiresIn, httpOnly: true, secure: true }
        res.cookie('session', sessionCookie, options)
        res.end(JSON.stringify({ status: 'success' }))
    } catch (error) {
        console.log(error)
        res.status(401).send('UNAUTHORIZED REQUEST!')
    }
}

export const checkSession = async (req, res, next) => {
    const sessionCookie = req.cookies.session || ''
    try {
        const decodedClaims = await admin
            .auth()
            .verifySessionCookie(sessionCookie, true)
        res.locals.decodedClaims = decodedClaims
        res.locals.user_id = decodedClaims.user_id
        next()
    } catch (error) {
        res.locals.sessionCookieInvalid = true
        res.status(401).send('Session cookie not valid. Please log in')
    }
}

// const getAuthToken = (req, res, next) => {
//     if (req.headers.authorization &&
//         req.headers.authorization.split(' ')[0] === 'Bearer'
//     ) {
//         req.authToken = req.headers.authorization.split(' ')[1]
//     } else {
//         req.authToken = null
//     }
//     next()
// }
//
// export const checkIfAuthenticated = (req, res, next) => {
//     getAuthToken(req, res, async () => {
//         try {
//             const authToken = req.headers.authorization.substr(7)
//             const userInfo = await admin
//                 .auth()
//                 .verifyIdToken(authToken)
//             req.authId = userInfo.uid
//             return next()
//         } catch (e) {
//             console.log(e)
//             return res
//                 .status(401)
//                 .send({ error: 'You are not authorized to make this request' })
//         }
//     })
// }