import React, { useState } from 'react'
import EntryInput from "./EntryInput";

function EntryForm() {

    const [date, setDate] = useState(null)
    const [title, setTitle] = useState('')
    const [money, setMoney] = useState(0)

    const addButtonClick = () => {
        console.log('click')
    }

    return (
        <div>
            <EntryInput
                name="date"
                value={date}
                placeholder="Date"
                // isValid={dateIsValid}
                // onBlur={this.onDateBlur}
                updateValue={setDate}
            />
            <EntryInput
                name="title"
                value={title}
                placeholder="Title"
                // isValid={titleIsValid}
                // onBlur={this.onTitleBlur}
                updateValue={setTitle}
            />
            <EntryInput
                name="money"
                value={money}
                placeholder="Income or Debt"
                // isValid={moneyIsValid}
                // onBlur={this.onMoneyBlur}
                updateValue={setMoney}
            />
            <button label="Add" onClick={addButtonClick} />
        </div>
    )
}

export default EntryForm