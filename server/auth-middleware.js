// https://dev.to/emeka/securing-your-express-node-js-api-with-firebase-auth-4b5f

import admin from './firebase-service'

const getAuthToken = (req, res, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1]
    } else {
        req.authToken = null
    }
    next()
}

export const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const authToken = req.headers.authorization.substr(7)
            console.log('authToken=', authToken)
            const userInfo = await admin
                .auth()
                .verifyIdToken(authToken)
            req.authId = userInfo.uid
            return next()
        } catch (e) {
            console.log(e)
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' })
        }
    })
}