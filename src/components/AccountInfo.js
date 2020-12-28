import React from 'react'

const AccountInfo = ({ user, logout }) => (
    <div style={Container}>
        {user.photoURL ? <img style={Image} src={user.photoURL} /> : null }
        <span>{user.displayName}</span>
        <span style={LogoutLink} onClick={logout}>Logout</span>
    </div>
)

const Container = {
    position: 'absolute',
    textAlign: 'center',
    top: '10px',
    right: '20px',
    fontFamily: 'Verdana'
}

const Image = {
    height: '1.2em',
    marginRight: '0.7em',
    marginBottom: '-3px'
}

const LogoutLink = {
    display: 'block',
    textAlign: 'right',
    marginTop: '6px',
    fontSize: '12px',
    color: '#505050',
    cursor: 'pointer'
}

export default AccountInfo