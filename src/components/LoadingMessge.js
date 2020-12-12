import React from 'react'

const LoadingMessage = () => (
    <div style={Container}>
        <div style={LoadingText}>
            One moment...
        </div>
    </div>
)

const Container = {
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid #aaaaaa'
}

const LoadingText = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '50px'
}

export default LoadingMessage