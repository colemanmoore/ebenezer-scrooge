import React, { useState, useEffect } from 'react'
import Grid from './Grid/Grid'
import GridRow from './Grid/GridRow'
import massage from '../util/entries'
import { useApi } from '../hooks/useApi'

function EntriesDisplay() {

  const api = useApi()

  const [selectedIdx, setSelectedIdx] = useState(null)
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (api.account) {
      setRows(massage(api.account, api.entries))
    }
  }, [api.account, api.entries])

  const clickRow = rowIdx => setSelectedIdx(rowIdx)

  const doubleClickRow = async rowId => {
    await api.deleteEntry(rowId)
    await api.refreshEntries()
  }

  const columns = [
    {key: 'date', name: 'Date'},
    {key: 'title', name: 'Title'},
    {key: 'money', name: '+/-'},
    {key: 'balance', name: 'Balance'}
  ]

  return (
    <div style={Container}>
      <Grid>
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
