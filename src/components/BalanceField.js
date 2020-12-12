import React, { useState } from 'react'

function BalanceField() {

    const [balance, setBalance] = useState(0)

    const onInputChange = () => {}
    const onInputBlur = () => {}

    return (
        <div style={Container}>
            <h2 style={Label}>Current Balance</h2>
            <input style={Input} value={balance} type="text" onChange={onInputChange} onBlur={onInputBlur} />
        </div>
    )
}

const Container = {
    margin: '10px 0 30px'
}

const Label = {
    display: 'inline',
    marginRight: '15px'
}

const Input = {
    display: 'inline',
    outline: 'none',
    fontSize: '1.3rem',
    padding: '5px'
}

export default BalanceField