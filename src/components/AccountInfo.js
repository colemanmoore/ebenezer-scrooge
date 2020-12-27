import React from 'react'

const AccountInfo = ({ user }) => (
    <div style={Container}>
        {user.photoURL ? <img style={Image} src={user.photoURL} /> : null }
        <span style={Text}>{user.displayName}</span>
        {/*<span style={Text}>{user.uid}</span>*/}
    </div>
)

const Container = {
    position: 'absolute',
    textAlign: 'center',
    top: '10px',
    right: '20px'
}

const Image = {
    height: '1.2em',
    marginRight: '0.7em',
    marginBottom: '-3px'
}

const Text = {
    fontFamily: 'Verdana'
}

export default AccountInfo