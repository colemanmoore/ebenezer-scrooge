import React, { useEffect, useState } from 'react'
import api from '../util/api'

function CurrentBalance() {

    const [balanceInput, setBalanceInput] = useState(null)
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        api.getAccount({ userId: '' }).then(resp => {
            setBalance(resp.data.account.balance)
            setBalanceInput(resp.data.account.balance)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const onInputChange = e => {
        setBalanceInput(e.target.value)
    }

    const onInputBlur = () => {
        let b
        try {
            b = parseInt(balanceInput)
            // api.updateAccount({ balance: b })
            setBalance(balanceInput)
        } catch (err) {
            setBalanceInput(balance)
        }
    }

    return (
        <div style={Container}>
            <h2 style={Label}>balance?</h2>
            <input
                size={12}
                style={Input}
                value={balanceInput}
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