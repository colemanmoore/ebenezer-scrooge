import React, { useState } from 'react'
import LoadingMessage from './LoadingMessge'
import Grid from './Grid/Grid'
import GridRow from './Grid/GridRow'
import GridHeader from './Grid/GridHeader'

function EntriesDisplay() {

    const columns = [
        {key: 'date', name: 'Date'},
        {key: 'title', name: 'Title'},
        {key: 'income', name: 'Income'},
        {key: 'debt', name: 'Debt'},
        {key: 'balance', name: 'Balance'}
    ]

    const data = [
        { date: '3/17/2020', title: 'coronavirus', debt: '-300000' },
        { date: '6/17/2020', title: 'birthda', income: '500' },
        { date: '12/10/2020', title: 'today', debt: '-50' }
    ]

    const [isBusy, setIsBusy] = useState(false)
    const [selectedIdx, setSelectedIdx] = useState(null)

    const clickRow = rowIdx => setSelectedIdx(rowIdx)

    return (
        <div style={Container}>
            {isBusy ? <LoadingMessage/> :
                <Grid>
                    <GridHeader columns={columns} />
                    {data.map((row, idx) => {
                        return <GridRow
                            key={idx}
                            keys={columns.map(col => col.key)}
                            selected={selectedIdx===idx}
                            onClick={clickRow.bind(null, idx)}
                            data={row}
                        />
                    })}
                </Grid>
            }
        </div>
    )
}

const Container = {
    display: 'flex',
    justifyContent: 'center'
}

export default EntriesDisplay