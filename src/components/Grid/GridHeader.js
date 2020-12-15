import React from 'react'
import classNames from 'classnames'
import style from './Grid.module.css'

function GridHeader({ columns = [] }) {
    return (
        <div className={classNames(style.row, style.header)}>
            {columns.map((col, idx) => {
                return <div key={idx} className={style.row}>{col.name}</div>
            })}
        </div>
    )
}

export default GridHeader