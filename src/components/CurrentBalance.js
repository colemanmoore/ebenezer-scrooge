import React, { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import api from '../util/api'

function CurrentBalance({ balance, setBalance }) {

    const { register, handleSubmit, setValue, reset } = useForm({
        defaultValues: { balance }
    })

    useEffect(() => {
        setValue('balance', balance)
    }, [balance])

    const onSubmit = data => {
        const val = +data.balance
        if (isNaN(val)) {
            reset()
        } else {
            setBalance({ balance: val })
            // api.updateAccount({ balance: val })
        }
    }

    return (
        <div style={Container}>
            <h2 style={Label}>balance?</h2>
            <form style={{display:'inline'}} onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="balance"
                    ref={register()}
                    size={12}
                    style={Input}
                    type="text"
                />
            </form>
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