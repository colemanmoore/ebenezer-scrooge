import React from 'react'

const LoginControl = ({ doLogin }) => (
    <div
        style={{
            backgroundColor: '#eeedfe',
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer'
        }}
        onClick={doLogin}
    >
        with whom do I have the pleasure of speaking?
    </div>
)

export default LoginControl