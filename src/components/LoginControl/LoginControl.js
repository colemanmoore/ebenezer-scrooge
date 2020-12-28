import React from 'react'
import styles from './LoginControl.module.css'

const LoginControl = ({ doLogin }) => (
    <div
        className={styles.container}
        onClick={doLogin}
    >
        with whom do I have the pleasure of speaking?
    </div>
)

export default LoginControl