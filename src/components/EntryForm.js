import React from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import api from '../util/api'
import { validateDate, validateMoney, createDate } from '../util/util'
import styles from './EntryForm.module.css'

function EntryForm() {

    const { register, handleSubmit, errors, reset } = useForm({
        mode: 'onBlur',
        defaultValues: {date: '', title: '', money: ''}
    })

    const onSubmit = data => {
        const date = createDate(data.date)
        const title = data.title
        const money = parseInt(data.money)

        if (date && title && money) {
            api.addEntry({ date, title, money, userId: 'useriddd' }).then(() => {
                console.log('added entry')
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                reset()
            })
        }
    }

    const allGood = () => !errors.date && !errors.title && !errors.money

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={classNames(styles.entryInput, {[styles.entryInputInvalid]: errors.date})}
                    name="date"
                    ref={register({
                        validate: value => validateDate(value)
                    })}
                    placeholder="Date"
                    size={11}
                />
                <input
                    className={classNames(styles.entryInput, {[styles.entryInputInvalid]: errors.title})}
                    name="title"
                    ref={register({
                        validate: value => !!value && value.length
                    })}
                    placeholder="Title"
                    size={20}
                />
                <input
                    className={classNames(styles.entryInput, {[styles.entryInputInvalid]: errors.money})}
                    name="money"
                    ref={register({
                        validate: value => validateMoney(value)
                    })}
                    placeholder="Income/Debt"
                    size={9}
                />
                <button type="submit" className={classNames(styles.addButton, {[styles.active]: allGood()})}>+</button>
            </form>
        </div>
    )
}

export default EntryForm