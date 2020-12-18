import React, { useState, useEffect } from 'react'
import Grid from './Grid/Grid'
import GridRow from './Grid/GridRow'
import GridHeader from './Grid/GridHeader'
import { compareDates, renderDate } from '../util/util'

function EntriesDisplay({ balance, entries }) {

    const [selectedIdx, setSelectedIdx] = useState(null)
    const [rows, setRows] = useState([])

    const massage = data => {
        const massaged = data.map(entry => ({
            id: entry.id,
            title: entry.title,
            date: renderDate(entry.date),
            money: entry.money,
            income: entry.money >= 0,
            debt: entry.money < 0
        })).sort((a, b) => compareDates(a.date, b.date))

        let rollingBalance = balance
        const result = []
        massaged.forEach(entry => {
            rollingBalance += entry.money
            result.push({
                ...entry,
                balance: rollingBalance
            })
        })
        return result
    }

    useEffect(() => {
        if (entries) {
            setRows(massage(entries))
        }
    }, [entries])

    useEffect(() => {
        setRows(massage(entries))
    }, [balance])

    const clickRow = rowIdx => setSelectedIdx(rowIdx)

    const doubleClickRow = rowId => { console.log(rowId) }

    const columns = [
        {key: 'date', name: 'Date'},
        {key: 'title', name: 'Title'},
        {key: 'money', name: '+/-'},
        {key: 'balance', name: 'Balance'}
    ]

    return (
        <div style={Container}>
            <Grid>
                {/*<GridHeader columns={columns} />*/}
                {rows.map((row, idx) => {
                    return <GridRow
                        key={idx}
                        keys={columns.map(col => col.key)}
                        selected={selectedIdx===idx}
                        onClick={clickRow.bind(null, idx)}
                        onDoubleClick={doubleClickRow.bind(null, row.id)}
                        data={row}
                    />
                })}
            </Grid>
        </div>
    )
}

const Container = {
    display: 'flex',
    justifyContent: 'center'
}

export default EntriesDisplay