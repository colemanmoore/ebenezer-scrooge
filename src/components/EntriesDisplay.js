import React, { useState, useEffect } from 'react'
import LoadingMessage from './LoadingMessge'
import Grid from './Grid/Grid'
import GridRow from './Grid/GridRow'
import GridHeader from './Grid/GridHeader'
import api from '../util/api'

function EntriesDisplay() {

    const columns = [
        {key: 'date', name: 'Date'},
        {key: 'title', name: 'Title'},
        {key: 'income', name: 'Income'},
        {key: 'debt', name: 'Debt'},
        {key: 'balance', name: 'Balance'}
    ]

    const [isBusy, setIsBusy] = useState(false)
    const [selectedIdx, setSelectedIdx] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        api.listFutureEntries({ userId: 'asdf' }).then(resp => {
            setData(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

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