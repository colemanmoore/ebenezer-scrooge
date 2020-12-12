import React, { useState } from 'react'
import classNames from 'classnames'
import api from '../util/api'
import { validateDate, validateMoney, createDate } from '../util/util'
import styles from './EntryForm.module.css'

function EntryForm() {

    const [date, setDate] = useState(null)
    const [dateIsValid, setDateIsValid] = useState(true)
    const [title, setTitle] = useState(null)
    const [titleIsValid, setTitleIsValid] = useState(true)
    const [money, setMoney] = useState(null)
    const [moneyIsValid, setMoneyIsValid] = useState(true)

    const addButtonClick = () => {
        console.log('click', date, money, title)
        const moneyIn = parseInt(money)
        const dateIn = createDate(date)
        if (dateIn && title && moneyIn) {
            api.addEntry({ date, title, money, userId: 'useriddd' }).then(() => {
                console.log('added entry')
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleDate = e => {
        setDate(e.target.value)
        setDateIsValid(validateDate(e.target.value))
    }
    const handleTitle = e => {
        setTitle(e.target.value)
        setTitleIsValid((!!title && title.length))
    }

    const handleMoney = e => {
        setMoney(e.target.value)
        setMoneyIsValid(validateMoney(money))
    }

    const onDateBlur = e => setDateIsValid(validateDate(e.target.value))
    const onTitleBlur = () => setTitleIsValid((!!title && title.length))
    const onMoneyBlur = () => setMoneyIsValid(validateMoney(money))

    return (
        <div className={styles.container}>
            <input
                className={classNames(styles.entryInput, {[styles.entryInputInvalid]: !dateIsValid})}
                name="date"
                value={date}
                placeholder="Date"
                size={11}
                onBlur={onDateBlur}
                onChange={handleDate}
            />
            <input
                className={classNames(styles.entryInput, {[styles.entryInputInvalid]: !titleIsValid})}
                name="title"
                value={title}
                placeholder="Title"
                size={20}
                onBlur={onTitleBlur}
                onChange={handleTitle}
            />
            <input
                className={classNames(styles.entryInput, {[styles.entryInputInvalid]: !moneyIsValid})}
                name="money"
                value={money}
                placeholder="Income/Debt"
                size={9}
                onBlur={onMoneyBlur}
                onChange={handleMoney}
            />
            <div className={styles.addButton} onClick={addButtonClick}>+</div>
        </div>
    )
}

export default EntryForm