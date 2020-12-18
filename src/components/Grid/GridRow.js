import React from 'react'
import classNames from 'classnames'
import style from './Grid.module.css'

function GridRow({ keys, data, selected, onClick, onDoubleClick }) {
    return (
        <div className={classNames(style.row, {[style.selectedRow]: selected})}
             onClick={onClick} onDoubleClick={onDoubleClick}
        >
            {keys.map(key => {

                return (
                    <div key={key} className={
                        classNames(style.cell, {
                            [style.debt]: data.debt && key==='money',
                            [style.balance]: key==='balance',
                            [style.negBalance]: key==='balance' && data[key] < 0
                        })
                    }>
                        {data[key]}
                    </div>
                )
            })}
        </div>
    )
}

export default GridRow