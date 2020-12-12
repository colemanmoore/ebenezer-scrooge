import React, { useState } from 'react'

function CurrentBalance() {

    const [balance, setBalance] = useState(null)

    const onInputChange = e => {
        console.log(e.target.value)
        setBalance(e.target.value)
    }

    const onInputBlur = () => {}

    return (
        <div style={Container}>
            <h2 style={Label}>balance?</h2>
            <input
                size={12}
                style={Input}
                value={balance}
                type="text"
                onChange={onInputChange}
                onBlur={onInputBlur}
            />
        </div>
    )
}

const Container = {
    margin: '10px 0 30px'
}

const Label = {
    display: 'inline',
    marginRight: '15px',
    fontWeight: '200'
}

const Input = {
    display: 'inline',
    outline: 'none',
    fontSize: '1.3rem',
    padding: '5px',
    backgroundColor: '#ebfaeb',
    border: 'none',
    textAlign: 'center',
    borderRadius: '9px',
    fontWeight: 'bold'
}

export default CurrentBalance